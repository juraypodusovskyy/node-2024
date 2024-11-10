import { UploadedFile } from "express-fileupload";

import { EFileType } from "../enums/file-item-type.enum";
import {
  IUser,
  IUserPublicResDto,
  IUserQuery,
} from "../interfaces/user.interface";
import { userPresent } from "../presenters/user.presenters";
import { activeTokenRepository } from "../repositories/active-token.repositories";
import { tokenRepository } from "../repositories/token.repositories";
import { userRepository } from "../repositories/user.repository";
import { s3service } from "./s3.service";

class UserService {
  public async upload(
    userId: string,
    user: Partial<IUser>,
  ): Promise<IUserPublicResDto> {
    const updateUser = await userRepository.update(user, userId);
    return userPresent.toPublicResDto(updateUser);
  }
  public async getList(query: IUserQuery): Promise<IUserPublicResDto[]> {
    const users = await userRepository.getList(query);
    return userPresent.toPublicResDtoList(users);
  }
  public async getById(userId: string): Promise<IUserPublicResDto> {
    const user = await userRepository.getById(userId);
    return userPresent.toPublicResDto(user);
  }
  public async delete(userId: string): Promise<void> {
    await Promise.all([
      userRepository.delete(userId),
      tokenRepository.delete({ _userId: userId }),
      activeTokenRepository.delete(userId),
    ]);
  }
  public async uploadAvatar(
    userId: string,
    file: UploadedFile,
  ): Promise<IUserPublicResDto> {
    const { avatar } = await userRepository.getById(userId);
    if (avatar) {
      await s3service.deleteFile(avatar);
    }
    const filePath = await s3service.uploadFile(file, EFileType.USERS, userId);
    const user = await userRepository.update({ avatar: filePath }, userId);
    return userPresent.toPublicResDto(user);
  }
}

export const userService = new UserService();

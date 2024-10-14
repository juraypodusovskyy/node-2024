import { UploadedFile } from "express-fileupload";

import { EFileType } from "../enums/file-item-type.enum";
import { IUser } from "../interfaces/user.interface";
import { activeTokenRepository } from "../repositories/active-token.repositories";
import { tokenRepository } from "../repositories/token.repositories";
import { userRepository } from "../repositories/user.repository";
import { s3service } from "./s3.service";

class UserService {
  public async upload(userId: string, user: Partial<IUser>): Promise<IUser> {
    return await userRepository.update(user, userId);
  }
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }
  public async delete(userId: string): Promise<void> {
    await Promise.all([
      userRepository.delete(userId),
      tokenRepository.delte({ _userId: userId }),
      activeTokenRepository.delete(userId),
    ]);
  }
  public async uploadAvatar(
    userId: string,
    file: UploadedFile,
  ): Promise<IUser> {
    const { avatar } = await userRepository.getById(userId);
    if (avatar) {
      await s3service.deleteFile(avatar);
    }
    const filePath = await s3service.uploadFile(file, EFileType.USERS, userId);
    return await userRepository.update({ avatar: filePath }, userId);
  }
}

export const userService = new UserService();

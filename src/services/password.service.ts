import * as bcrypt from "bcrypt";

import { EEmailType } from "../enums/email.enum";
import { ETokenType } from "../enums/tokens.enum";
import { ApiError } from "../errors/api-error";
import { IPayload } from "../interfaces/token.interface";
import { ICngPassword, IUser } from "../interfaces/user.interface";
import { activeTokenRepository } from "../repositories/active-token.repositories";
import { tokenRepository } from "../repositories/token.repositories";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { tokenService } from "./token.service";

class PasswordService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async forgotPasswordSendEmail({ _id, role, email }: IUser): Promise<void> {
    const activeToken = tokenService.generateToken(
      { role, userId: _id },
      ETokenType.FORGOT,
    );
    await Promise.all([
      activeTokenRepository.create({ activeToken, _userId: _id }),
      emailService.sendEmail(email, EEmailType.FORGOT_PASSWORD, {
        actionToken: activeToken,
      }),
    ]);
  }

  public forgotPassword = async ({ userId }: IPayload, newPassword: string) => {
    const password = await this.hashPassword(newPassword);
    await Promise.all([
      userRepository.update({ password }, userId),
      activeTokenRepository.delete(userId),
      tokenRepository.delete({ _userId: userId }),
    ]);
  };

  public changePassword = async (
    { userId }: IPayload,
    { newPassword, oldPassword }: ICngPassword,
  ): Promise<void> => {
    const { password } = await userRepository.getById(userId);
    const isPasswordCorrect = await this.comparePassword(oldPassword, password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid credentials");
    }
    const hashPassword = await this.hashPassword(newPassword);
    await Promise.all([
      userRepository.update({ password: hashPassword }, userId),
      tokenRepository.delete({ _userId: userId }),
      activeTokenRepository.delete(userId),
    ]);
  };
}

export const passwordService = new PasswordService();

import { EEmailType } from "../enums/email.enum";
import { ETokenType } from "../enums/tokens.enum";
import { ApiError } from "../errors/api-error";
import { IPayload, ITokenPair } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { tokenRepositori } from "../repositories/token.repositories";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async login(
    dto: Partial<IUser>,
  ): Promise<{ tokens: ITokenPair; user: IUser }> {
    const { email } = dto;
    const user = await userRepository.getByEmail(email);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid credentials");
    }

    const tokens = tokenService.generateTokens({
      role: user.role,
      userId: user._id,
    });

    return { tokens, user };
  }

  public async refresh({ role, userId }: IPayload): Promise<ITokenPair> {
    await tokenRepositori.delte({ _userId: userId });
    const tokens = tokenService.generateTokens({ role, userId });
    return await tokenRepositori.create(tokens, userId);
  }

  public async register(user: IUser): Promise<IUser> {
    const hashPassword = await passwordService.hashPassword(user.password);
    const newUser = await userRepository.create({
      ...user,
      password: hashPassword,
    });
    const actionToken = tokenService.generateToken(
      {
        role: newUser.role,
        userId: newUser._id,
      },
      ETokenType.ACTIVATE,
    );

    emailService.sendEmail(newUser.email, EEmailType.WELCOME, {
      actionToken,
      name: newUser.name,
    });
    return newUser;
  }
}

export const authService = new AuthService();

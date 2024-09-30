import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserMiddleware {
  private getUserByEmail = async (email: string): Promise<IUser | null> => {
    return await userRepository.getByEmail(email);
  };

  public isEmailExistOrThrow = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.body as IUser;
      const user = await this.getUserByEmail(email);

      if (user) {
        throw new ApiError(409, "Email already exists");
      }

      next();
    } catch (e) {
      next(e);
    }
  };
}

export const userMiddleware = new UserMiddleware();

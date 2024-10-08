import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserMiddleware {
  private async checkUserByEmail(email: string): Promise<IUser | null> {
    return await userRepository.getByEmail(email);
  }

  public isEmailExistOrThrow = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.body as IUser;
      const user = await this.checkUserByEmail(email);

      if (user) {
        return next(new ApiError(409, "Email already exists"));
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  public isEmailExist = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.body as IUser;
      const user = await this.checkUserByEmail(email);

      if (!user) {
        return next(new ApiError(409, "Email does not exist"));
      }
      req.res.locals.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
}

export const userMiddleware = new UserMiddleware();

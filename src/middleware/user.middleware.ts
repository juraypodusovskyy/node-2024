import { NextFunction, Request, Response } from "express";

import { ERole } from "../enums/role.enums";
import { ApiError } from "../errors/api-error";
import { IPayload } from "../interfaces/token.interface";
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

  public checkRole(role: ERole) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { role: userRole } = req.res.locals.jwtPayload as IPayload;
        if (userRole === role || userRole === ERole.ADMIN) {
          next();
        } else {
          throw new ApiError(403, "Access denied: insufficient permissions");
        }
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();

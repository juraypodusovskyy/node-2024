import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums/tokens.enum";
import { ApiError } from "../errors/api-error";
import { tokenRepositori } from "../repositories/token.repositories";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public checkToken(tokenType: ETokenType) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const token = req.headers.authorization;

        if (!token) {
          throw new ApiError(401, "Token is not provided");
        }

        const payload = tokenService.verifyToken(token, tokenType);

        const tokenPair = await tokenRepositori.getByParams({
          _userId: payload.userId,
          [tokenType]: token,
        });

        if (!tokenPair) {
          throw new ApiError(401, "Token is not valid");
        }

        req.res.locals.jwtPayload = payload;

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();

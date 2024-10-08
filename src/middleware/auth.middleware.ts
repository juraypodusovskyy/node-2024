import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums/tokens.enum";
import { ApiError } from "../errors/api-error";
import { activeTokenRepository } from "../repositories/active-token.repositories";
import { tokenRepository } from "../repositories/token.repositories";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  private _getToken = (req: Request, source: "header" | "body"): string => {
    const token =
      source === "header" ? req.headers.authorization : req.body?.activeToken;

    if (!token) {
      throw new ApiError(401, "Token is not provided");
    }
    return token;
  };

  public checkToken = (tokenType: ETokenType) => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const token = this._getToken(req, "header");
        const payload = tokenService.verifyToken(token, tokenType);

        const tokenPair = await tokenRepository.getByParams({
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
  };

  public checkActiveToken(tokenType: ETokenType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = this._getToken(req, "body");
        const payload = tokenService.verifyToken(token, tokenType);

        const findToken = await activeTokenRepository.findByParams({
          _userId: payload.userId,
          activeToken: token,
        });

        if (!findToken) {
          throw new ApiError(401, `${tokenType} token is not valid`);
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

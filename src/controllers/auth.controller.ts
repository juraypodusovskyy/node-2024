import { NextFunction, Request, Response } from "express";

import { IPayload } from "../interfaces/token.interface";
import { ILogUser, IUser } from "../interfaces/user.interface";
import { tokenRepositori } from "../repositories/token.repositories";
import { authService } from "../services/auth.service";

class AuthControler {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const logUser = req.body as ILogUser;
      const { tokens, user } = await authService.login(logUser);
      await tokenRepositori.delte({ _userId: user._id });
      const tokenPair = await tokenRepositori.create(tokens, user._id);
      res.status(201).send(tokenPair);
    } catch (e) {
      next(e);
    }
  }
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as IUser;
      const newUser = await authService.register(user);
      res.status(201).send(newUser);
    } catch (e) {
      next(e);
    }
  }
  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.jwtPayload as IPayload;
      const { accessToken, refreshToken } = await authService.refresh(payload);
      res.status(201).send({ access: accessToken, refresh: refreshToken });
    } catch (e) {
      next(e);
    }
  }
}

export const authControler = new AuthControler();

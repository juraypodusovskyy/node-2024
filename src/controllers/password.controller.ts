import { NextFunction, Request, Response } from "express";

import { IPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { passwordService } from "../services/password.service";

class Passwordcontroller {
  public async forgotPasswordSendEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = req.res.locals.user as IUser;
      await passwordService.forgotPasswordSendEmail(user);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.jwtPayload as IPayload;
      const password = req.body.password as string;
      await passwordService.forgotPassword(payload, password);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const passwordcontroller = new Passwordcontroller();

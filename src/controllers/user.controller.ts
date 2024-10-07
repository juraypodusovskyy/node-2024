import { NextFunction, Request, Response } from "express";

import { IPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repositories";
import { userRepository } from "../repositories/user.repository";

class UserControllers {
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as IPayload;
      const user = req.body as IUser;
      const newUser = await userRepository.update(user, userId);
      res.status(201).send(newUser);
    } catch (e) {
      next(e);
    }
  }
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepository.getList();
      res.status(200).send(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as IPayload;
      const user = await userRepository.getById(userId);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as IPayload;
      await userRepository.delete(userId);
      await tokenRepository.delte({ _userId: userId });
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const usercontrollers = new UserControllers();

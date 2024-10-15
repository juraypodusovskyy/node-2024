import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { EFileType } from "../enums/file-item-type.enum";
import { IPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserControllers {
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as IPayload;
      const user = req.body as IUser;
      const newUser = userService.upload(userId, user);
      res.status(201).send(newUser);
    } catch (e) {
      next(e);
    }
  }
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getList();
      res.status(200).send(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as IPayload;
      const user = await userService.getById(userId);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as IPayload;
      await userService.delete(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as IPayload;
      const file = req.files[EFileType.USERS] as UploadedFile;
      const user = await userService.uploadAvatar(userId, file);
      res.status(201).send(user);
    } catch (e) {
      next(e);
    }
  }
}

export const usercontrollers = new UserControllers();

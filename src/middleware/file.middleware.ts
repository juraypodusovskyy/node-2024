import { NextFunction, Request, Response } from "express";

class Filemiddleware {
  public async isFileValid(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const filemiddleware = new Filemiddleware();

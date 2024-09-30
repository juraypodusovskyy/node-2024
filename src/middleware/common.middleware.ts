import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api-error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError(400, "Invalid ID");
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = req.body;
        const validatedBody = await validator.validateAsync(body);
        req.body = validatedBody;
        next();
      } catch (e) {
        next(new ApiError(400, e.details?.[0]?.message || "Invalid Body"));
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();

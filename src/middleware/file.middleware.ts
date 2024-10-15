import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { EFileType } from "../enums/file-item-type.enum";
import { ApiError } from "../errors/api-error";

class Filemiddleware {
  public isImage = (file: UploadedFile): boolean => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    return allowedMimeTypes.includes(file.mimetype);
  };
  public isFileValid = (fileType: EFileType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const file = req?.files?.[fileType] as UploadedFile;
        if (!file) {
          throw new ApiError(400, "The file is not enchanted.");
        }
        const isFileImg = this.isImage(file);
        if (!isFileImg) {
          throw new ApiError(
            400,
            "Only image files (jpeg, jpg, png, gif) are allowed.",
          );
        }
        const maxSize = 1 * 1024 * 1024; // 1MB
        if (file.size > maxSize) {
          return res.status(400).send("The file is huge. Maximum size - 1MB.");
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  };
}

export const filemiddleware = new Filemiddleware();

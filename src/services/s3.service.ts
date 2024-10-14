import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";
import path from "path";

import { configs } from "../configs/configs";
import { EFileType } from "../enums/file-item-type.enum";

class S3service {
  private readonly s3Client = new S3Client({
    region: configs.AWS_S3_REGION,
    credentials: {
      accessKeyId: configs.AWS_ACCESS_KEY,
      secretAccessKey: configs.AWS_SECRET_KEY,
    },
  });

  private buildPath(itemType: EFileType, itemId: string, fileName): string {
    return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`;
  }

  public async uploadFile(
    file: UploadedFile,
    itemType: EFileType,
    itemId: string,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(itemType, itemId, file.name);
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: configs.AWS_S3_BUCKET_NAME,
          Key: filePath,
          Body: file.data,
          ContentType: file.mimetype,
          ACL: configs.AWS_S3_ACL,
        }),
      );
      return filePath;
    } catch (error) {
      console.error("Error upload", error);
    }
  }
}

export const s3service = new S3service();

import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { IProduct } from "../interfaces/product.interface";
import { IPayload } from "../interfaces/token.interface";
import { productService } from "../services/product.service";

class ProductController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.jwtPayload as IPayload;
      const body = req.body as IProduct;
      const product = await productService.create(payload, body);
      res.status(201).send(product);
    } catch (e) {
      next(e);
    }
  }
  public async updatePhoto(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const photo = req.files.products as UploadedFile;
      const product = await productService.uploadPhoto(productId, photo);
      res.status(201).send(product);
    } catch (e) {
      next(e);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const body = req.body as IProduct;
      const product = await productService.upload(productId, body);
      res.status(201).send(product);
    } catch (e) {
      next(e);
    }
  }
}

export const productController = new ProductController();

import { NextFunction, Request, Response } from "express";

import { ERole } from "../enums/role.enums";
import { ApiError } from "../errors/api-error";
import { IPayload } from "../interfaces/token.interface";
import { productRepositories } from "../repositories/product.repositories";
import { productService } from "../services/product.service";

class ProductMiddleware {
  public async isProductSeller(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId, role } = req.res.locals.jwtPayload as IPayload;
      const productId = req.params.id;
      const product = await productService.getByParams({
        _userId: userId,
        _id: productId,
      });

      if (!product) {
        throw new ApiError(404, "Product not found");
      }

      if (product._userId !== userId || role !== ERole.ADMIN) {
        new ApiError(403, "Access denied: not the product seller");
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isProductExistsOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const productId = req.params.productId;
      const product = await productRepositories.getById(productId);
      if (!product) {
        throw new ApiError(404, "Product not found");
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const productMiddleware = new ProductMiddleware();

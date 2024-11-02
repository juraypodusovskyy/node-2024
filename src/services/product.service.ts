import { UploadedFile } from "express-fileupload";

import { EFileType } from "../enums/file-item-type.enum";
import { IProduct, IProductQuery } from "../interfaces/product.interface";
import { IPayload } from "../interfaces/token.interface";
import { productRepositories } from "../repositories/product.repositories";
import { s3service } from "./s3.service";

class ProductService {
  public async create(payload: IPayload, dto: IProduct): Promise<IProduct> {
    return await productRepositories.create({
      ...dto,
      _userId: payload.userId,
    });
  }

  public async getByParams(dto: Partial<IProduct>): Promise<IProduct> {
    return await productRepositories.getByParams(dto);
  }

  public async getList(query: IProductQuery): Promise<IProduct[]> {
    return await productRepositories.getList(query);
  }
  public async uploadPhoto(
    productId: string,
    photo: UploadedFile,
  ): Promise<IProduct> {
    const filePath = await s3service.uploadFile(
      photo,
      EFileType.PRODUCTS,
      productId,
    );
    return await productRepositories.update(productId, { photo: filePath });
  }

  public async upload(
    productId: string,
    dto: Partial<IProduct>,
  ): Promise<IProduct> {
    return await productRepositories.update(productId, dto);
  }

  public async delete(productId: string): Promise<void> {
    await productRepositories.delete(productId);
  }
  public async updateViews(productId: string): Promise<void> {
    const product = await productRepositories.getByParams({
      _id: productId,
    });

    await productRepositories.update(productId, {
      views: (product[0].views += 1),
    });
  }
}

export const productService = new ProductService();

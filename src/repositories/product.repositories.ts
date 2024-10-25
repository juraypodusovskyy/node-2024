import { IProduct } from "../interfaces/product.interface";
import { Product } from "../models/product.model";

class ProductRepositories {
  public async create(dto: IProduct): Promise<IProduct> {
    return await Product.create(dto);
  }
  public async getByParams(dto: Partial<IProduct>): Promise<IProduct> {
    return (await Product.find(dto)) as unknown as IProduct;
  }
  public async update(
    productId: string,
    dto: Partial<IProduct>,
  ): Promise<IProduct> {
    return await Product.findByIdAndUpdate(productId, dto, {
      new: true,
    });
  }
}

export const productRepositories = new ProductRepositories();

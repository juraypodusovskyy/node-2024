import { FilterQuery } from "mongoose";

import { IProduct, IProductQuery } from "../interfaces/product.interface";
import { Product } from "../models/product.model";

class ProductRepositories {
  public async create(dto: IProduct): Promise<IProduct> {
    return await Product.create(dto);
  }
  public async getByParams(dto: Partial<IProduct>): Promise<IProduct> {
    return (await Product.find(dto)) as unknown as IProduct;
  }
  public async getList(query: IProductQuery): Promise<IProduct[]> {
    const filterObj: FilterQuery<IProduct> = {};

    if (query.category) {
      filterObj.category = query.category;
    }

    if (query.search) {
      filterObj.name = { $regex: query.search, $options: "i" };
    }

    const skip = query.limit * (query.page - 1);

    const sort: { [key: string]: 1 | -1 } =
      query?.orderBy && query.order
        ? { [query.orderBy]: query.order === "asc" ? 1 : -1 }
        : { views: -1 };

    return await Product.find(filterObj)
      .limit(query.limit)
      .skip(skip)
      .sort(sort);
  }
  public async update(
    productId: string,
    dto: Partial<IProduct>,
  ): Promise<IProduct> {
    return await Product.findByIdAndUpdate(productId, dto, {
      new: true,
    });
  }
  public async delete(productId: string): Promise<void> {
    await Product.deleteOne({ _id: productId });
  }
}

export const productRepositories = new ProductRepositories();

import { FilterQuery } from "mongoose";

import { IProduct, IProductQuery } from "../interfaces/product.interface";
import { IResponse } from "../interfaces/response.interface";
import { Product } from "../models/product.model";

class ProductRepositories {
  public async create(dto: IProduct): Promise<IProduct> {
    return await Product.create(dto);
  }
  public async getByParams(dto: Partial<IProduct>): Promise<IProduct> {
    return (await Product.find(dto)) as unknown as IProduct;
  }
  public async getById(productId: string): Promise<IProduct> {
    return await Product.findById(productId);
  }
  public async getList(query: IProductQuery): Promise<IResponse<IProduct[]>> {
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

    const count = await Product.countDocuments(filterObj);

    const product = await Product.find(filterObj)
      .limit(query.limit)
      .skip(skip)
      .sort(sort);

    const data = {
      count,
      page: query?.page || 1,
      limit: query?.limit || 10,
      totalPage: Math.ceil(count / query.limit),
      data: product,
    };

    return data;
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

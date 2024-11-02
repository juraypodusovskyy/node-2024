import { EProductCategory } from "../enums/product.enums";
import { EOrder, EOrderByProduct } from "../enums/query-user.enum";

interface IProduct {
  _id?: string;
  _userId: string;
  name: string;
  price: number;
  category: string;
  weight: number;
  description?: string;
  photo?: string;
  views?: number;
}

interface IProductQuery {
  limit?: number;
  page?: number;
  order?: EOrder;
  orderBy?: EOrderByProduct;
  search?: string;
  category?: EProductCategory;
}

export type { IProduct, IProductQuery };

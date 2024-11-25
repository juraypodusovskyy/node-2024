import { EPurchaseOrderBy, EPurchaseStatus } from "../enums/purchase.enum";
import { EOrder } from "../enums/query-user.enum";
import { IProduct } from "./product.interface";

interface IPurchase {
  _id?: string;
  products: string[] | IProduct[];
  purchaseDate: Date;
  totalAmount: number;
  phone: string;
  status?: string;
}

interface IQueryPurchase {
  limit?: number;
  page?: number;
  order?: EOrder;
  orderBy?: EPurchaseOrderBy;
  status?: EPurchaseStatus;
}

export type { IPurchase, IQueryPurchase };

import { IProduct } from "./product.interface";

interface IPurchase {
  _id?: string;
  products: string[] | IProduct[];
  purchaseDate: Date;
  totalAmount: number;
  phone: string;
  status?: string;
}

export type { IPurchase };

interface IProductComment {
  comment: string;
  userName: string;
  _productId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { IProductComment };

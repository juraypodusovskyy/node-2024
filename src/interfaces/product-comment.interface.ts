interface IProductComment {
  comment: string;
  userName: string;
  _productId: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { IProductComment };

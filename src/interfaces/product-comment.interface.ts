interface IProductComment {
  comment: string;
  userName: string;
  _productId: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ICommentQuery {
  page?: number;
  limit?: number;
  rating?: number;
}

export type { IProductComment, ICommentQuery };

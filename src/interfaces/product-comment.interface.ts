import { EOrderByComment } from "../enums/comment.enum";
import { EOrder } from "../enums/query-user.enum";

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
  order?: EOrder;
  orderBy?: EOrderByComment;
}

export type { IProductComment, ICommentQuery };

import {
  ICommentQuery,
  IProductComment,
} from "../interfaces/product-comment.interface";
import { IResponse } from "../interfaces/response.interface";
import { Comments } from "../models/product-comment";

class CommentRepository {
  public async create(dto: IProductComment): Promise<IProductComment> {
    return await Comments.create(dto);
  }

  public async delete(commentId: string): Promise<void> {
    await Comments.deleteOne({ _id: commentId });
  }

  public async getList(
    query: ICommentQuery,
    productId: string,
  ): Promise<IResponse<IProductComment[]>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = limit * (page - 1);
    const sort: { [key: string]: 1 | -1 } = query.rating
      ? { rating: -1 }
      : { createdAt: -1 };
    const count = await Comments.countDocuments({ _productId: productId });
    const comments = await Comments.find({ _productId: productId })
      .skip(skip)
      .limit(limit)
      .sort(sort);

    return {
      count,
      page,
      limit,
      totalPage: Math.ceil(count / limit),
      data: comments,
    };
  }
}

export const commentRepository = new CommentRepository();

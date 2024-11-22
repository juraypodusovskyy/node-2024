import { Types } from "mongoose";

import {
  ICommentQuery,
  IProductComment,
} from "../interfaces/product-comment.interface";
import { IResponse } from "../interfaces/response.interface";
import { Comments } from "../models/product-comment";
import { productRepositories } from "./product.repositories";

class CommentRepository {
  public async getAverageRating(productId: string): Promise<number> {
    const productObjectId = new Types.ObjectId(productId);

    const result = await Comments.aggregate([
      {
        $match: {
          _productId: productObjectId,
          rating: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    const averageRating = result.length > 0 ? result[0].averageRating : 0;

    return parseFloat(averageRating.toFixed(1));
  }

  public async create(dto: IProductComment): Promise<IProductComment> {
    const newComment = await Comments.create(dto);
    const rating = await this.getAverageRating(dto._productId);
    await productRepositories.update(dto._productId, { rating: rating });
    return newComment;
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

    const sort: { [key: string]: 1 | -1 } =
      query?.orderBy && query.order
        ? { [query.orderBy]: query.order === "asc" ? 1 : -1 }
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

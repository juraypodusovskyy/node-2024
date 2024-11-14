import { NextFunction, Request, Response } from "express";

import {
  ICommentQuery,
  IProductComment,
} from "../interfaces/product-comment.interface";
import { commentRepository } from "../repositories/comment.repository";

class CommentController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.productId;
      const comment = req.body as IProductComment;
      const newComment = await commentRepository.create({
        ...comment,
        _productId: productId,
      });

      res.status(201).send(newComment);
    } catch (e) {
      next(e);
    }
  }
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.productId;
      const query = req.query as ICommentQuery;
      const comments = await commentRepository.getList(query, productId);
      res.status(200).send(comments);
    } catch (e) {
      next(e);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const commentId = req.params.productId;
      await commentRepository.delete(commentId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const commentController = new CommentController();

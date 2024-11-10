import Joi from "joi";

export class CommentValidator {
  private static comment = Joi.string().min(10).max(600).trim();
  private static userName = Joi.string().min(1).max(25).trim();
  private static rating = Joi.number().min(0).max(10);
  private static productId = Joi.string().trim();

  public static create = Joi.object({
    comment: this.comment.required(),
    userName: this.userName.required(),
    rating: this.rating.required(),
    productId: this.productId.required(),
  });

  public static query = Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    rating: this.rating,
  });
}

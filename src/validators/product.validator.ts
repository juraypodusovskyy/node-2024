import Joi from "joi";

import { EProductCategory } from "../enums/product.enums";
import { EOrder, EOrderByProduct } from "../enums/query-user.enum";

export class ProductValidator {
  private static name = Joi.string().trim().min(3).max(255);
  private static price = Joi.number().min(1).max(9999);
  private static category = Joi.string().valid(
    ...Object.values(EProductCategory),
  );
  private static description = Joi.string().max(255).trim();
  private static weight = Joi.number();
  private static views = Joi.number();

  public static create = Joi.object({
    name: this.name.required(),
    price: this.price.required(),
    category: this.category.required(),
    weight: this.weight.required(),
    description: this.description,
  });

  public static update = Joi.object({
    weight: this.weight,
    name: this.name,
    price: this.price,
    category: this.category,
    description: this.description,
  });

  public static updateViews = Joi.object({
    views: this.views.required(),
  });

  public static listQuery = Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    search: Joi.string().trim().lowercase(),
    order: Joi.string().valid(...Object.values(EOrder)),
    orderBy: Joi.string().valid(...Object.values(EOrderByProduct)),
    category: Joi.string()
      .valid(...Object.values(EProductCategory))
      .lowercase(),
  });
}

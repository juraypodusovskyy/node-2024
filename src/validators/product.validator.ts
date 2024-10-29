import Joi from "joi";

import { EProductCategory } from "../enums/product.enums";

export class ProductValidator {
  private static name = Joi.string().trim().min(3).max(255);
  private static price = Joi.number().min(1).max(9999);
  private static category = Joi.string().valid(
    ...Object.values(EProductCategory),
  );
  private static description = Joi.string().max(255).trim();

  public static create = Joi.object({
    name: this.name.required(),
    price: this.price.required(),
    category: this.category.required(),
    description: this.description,
  });

  public static update = Joi.object({
    name: this.name,
    price: this.price,
    category: this.category,
    description: this.description,
  });
}

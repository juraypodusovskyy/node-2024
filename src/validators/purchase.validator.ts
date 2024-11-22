import Joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class PurchaseValidator {
  private static product = Joi.object({
    productId: Joi.string().required(), // ID продукту
    quantity: Joi.number().min(1).required(), // Кількість продукту (мінімум 1)
  }).required();

  private static totalAmount = Joi.number().min(5);
  private static phone = Joi.string().regex(regexConstant.PHONE);

  public static create = Joi.object({
    products: Joi.array().items(this.product).min(1).required(), // Масив продуктів з перевіркою кожного
    totalAmount: this.totalAmount.required(),
    phone: this.phone.required(),
  });
}

import Joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { EPurchaseOrderBy, EPurchaseStatus } from "../enums/purchase.enum";
import { EOrder } from "../enums/query-user.enum";

export class PurchaseValidator {
  private static product = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
  }).required();

  private static totalAmount = Joi.number().min(5);
  private static phone = Joi.string().regex(regexConstant.PHONE);
  private static status = Joi.string()
    .trim()
    .lowercase()
    .valid(...Object.values(EPurchaseStatus));

  public static create = Joi.object({
    products: Joi.array().items(this.product).min(1).required(),
    totalAmount: this.totalAmount.required(),
    phone: this.phone.required(),
  });

  public static listQuery = Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    status: this.status,
    order: Joi.string().valid(...Object.values(EOrder)),
    orderBy: Joi.string().valid(...Object.values(EPurchaseOrderBy)),
  });

  public static update = Joi.object({
    status: this.status.required(),
  });
}

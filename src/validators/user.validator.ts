import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { EOrder, EOrderBy } from "../enums/query-user.enum";
// import { ERole } from "../enums/role.enums";
// import { EStatus } from "../enums/status.enum";

export class UserValidator {
  private static name = joi.string().min(3).max(20).trim();
  private static activeToken = joi.string().trim();
  private static email = joi
    .string()
    .trim()
    .lowercase()
    .regex(regexConstant.EMAIL);
  private static phone = joi.string().trim().regex(regexConstant.PHONE);
  private static password = joi.string().trim().regex(regexConstant.PASSWORD);
  // private static role = joi
  //   .string()
  //   .trim()
  //   .valid(...Object.values(ERole));
  // private static category = joi.string().trim();
  // private static status = joi
  //   .string()
  //   .trim()
  //   .valid(...Object.values(EStatus));

  public static create = joi.object({
    name: this.name.required(),
    email: this.email.required(),
    phone: this.phone.required(),
    password: this.password.required(),
  });

  public static update = joi.object({
    name: this.name,
    email: this.email,
    phone: this.phone,
    password: this.password,
  });

  public static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  public static isActiveTokenValid = joi.object({
    activeToken: this.activeToken.required(),
  });

  public static isEmailValid = joi.object({
    email: this.email.required(),
  });

  public static forgot = joi.object({
    activeToken: this.activeToken.required(),
    password: this.password.required(),
  });

  public static changePassword = joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });

  public static listQuery = joi.object({
    page: joi.number().min(1).default(1),
    limit: joi.number().min(1).max(100).default(10),
    search: joi.string().trim().lowercase(),
    order: joi.string().valid(...Object.values(EOrder)),
    orderBy: joi.string().valid(...Object.values(EOrderBy)),
  });
}

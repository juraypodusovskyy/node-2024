import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
// import { ERole } from "../enums/role.enums";
// import { EStatus } from "../enums/status.enum";

export class UserValidator {
  private static name = joi.string().min(3).max(20).trim();
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
}
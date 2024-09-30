import { model, Schema } from "mongoose";

import { ERole } from "../enums/role.enums";
import { EStatus } from "../enums/status.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, select: false },
    phone: { type: String, require: true, unique: true },
    role: { type: String, enum: ERole, default: "user" },
    category: { type: String, require: false },
    status: { type: String, enum: EStatus, default: "active" },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>("users", userSchema);

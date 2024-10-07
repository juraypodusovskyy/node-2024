import { model, Schema } from "mongoose";

import { IActivateToken } from "../interfaces/token.interface";
import { User } from "./user.model";

const tokenSchema = new Schema(
  {
    activateToken: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, require: true, ref: User },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const ActivateToken = model<IActivateToken>(
  "activateTokens",
  tokenSchema,
);

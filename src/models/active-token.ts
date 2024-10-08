import { model, Schema } from "mongoose";

import { IActiveToken } from "../interfaces/token.interface";
import { User } from "./user.model";

const tokenSchema = new Schema(
  {
    activeToken: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, require: true, ref: User },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const ActiveToken = model<IActiveToken>("active-tokens", tokenSchema);

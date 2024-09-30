import { model, Schema } from "mongoose";

import { User } from "./user.model";

const tokenSchema = new Schema(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },

    _userId: { type: Schema.Types.ObjectId, require: true, ref: User },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Token = model("tokens", tokenSchema);

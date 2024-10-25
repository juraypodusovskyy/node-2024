import { model, Schema } from "mongoose";

import { EProductCategory } from "../enums/product.enums";
import { IProduct } from "../interfaces/product.interface";
import { User } from "./user.model";

const product = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 1 },
    category: { type: String, required: true, enum: EProductCategory },
    description: { type: String, default: null },
    photo: { type: String, default: null },
    _userId: { type: Schema.Types.ObjectId, require: true, ref: User },
  },
  { versionKey: false, timestamps: true },
);

export const Product = model<IProduct>("products", product);

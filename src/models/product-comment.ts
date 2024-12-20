import { model, Schema } from "mongoose";

import { IProductComment } from "../interfaces/product-comment.interface";
import { Product } from "./product.model";

const productComment = new Schema(
  {
    comment: { type: String, require: true, max: 600 },
    userName: { type: String, require: true, min: 1, max: 25 },
    rating: { type: Number, min: 0, max: 10, require: true },
    _productId: { type: Schema.Types.ObjectId, ref: Product, require: true },
  },
  { versionKey: false, timestamps: true },
);

export const Comments = model<IProductComment>("comments", productComment);

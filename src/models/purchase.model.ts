import { model, Schema } from "mongoose";

import { Product } from "./product.model";

const purchaseSchema = new Schema(
  {
    products: { type: [Product], required: true },
    purchaseDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    // buyerId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { versionKey: false, timestamps: true },
);

export const Purchase = model("Purchase", purchaseSchema);

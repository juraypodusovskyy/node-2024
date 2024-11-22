import { model, Schema, Types } from "mongoose";

import { EPurchaseStatus } from "../enums/purchase.enum";
import { IPurchase } from "../interfaces/purchase.interface";

const purchaseSchema = new Schema(
  {
    products: [
      {
        productId: { type: Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    purchaseDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(EPurchaseStatus),
      default: EPurchaseStatus.PENDING,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Purchase = model<IPurchase>("purchase", purchaseSchema);

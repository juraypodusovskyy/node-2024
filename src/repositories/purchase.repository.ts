import mongoose from "mongoose";

import { IPurchase } from "../interfaces/purchase.interface";
import { Purchase } from "../models/purchase.model";

class PurchaseRepository {
  public async create(dto: Partial<IPurchase>): Promise<IPurchase> {
    return await Purchase.create(dto);
  }

  public async getPurchaseByIdWithProducts(
    purchaseId: string,
  ): Promise<IPurchase> {
    const [purchase] = await Purchase.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(purchaseId),
        },
      },
      {
        $lookup: {
          from: "products", // "products" collection
          localField: "products.productId", // Local field in the purchase document
          foreignField: "_id", // Foreign field in the product document
          as: "productDetails", // Output array of product details
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "product",
              in: {
                productId: {
                  $arrayElemAt: [
                    "$productDetails",
                    {
                      $indexOfArray: [
                        "$productDetails._id",
                        "$$product.productId",
                      ],
                    },
                  ],
                },
                quantity: "$$product.quantity", // Keep the quantity
              },
            },
          },
        },
      },
      {
        $project: {
          productDetails: 0, // Exclude productDetails from the final result
        },
      },
    ]);

    return purchase;
  }

  public async getList(): Promise<IPurchase[]> {
    return await Purchase.find();
  }
}

export const purchaseRepository = new PurchaseRepository();

import mongoose, { FilterQuery } from "mongoose";

import { EPurchaseStatus } from "../enums/purchase.enum";
import { IPurchase, IQueryPurchase } from "../interfaces/purchase.interface";
import { IResponse } from "../interfaces/response.interface";
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

  public async getList(query: IQueryPurchase): Promise<IResponse<IPurchase[]>> {
    const filterObj: FilterQuery<IPurchase> = {};

    if (query?.status) {
      filterObj.status = query.status;
    } else {
      filterObj.status = EPurchaseStatus.PENDING;
    }

    const skip = query.limit * (query.page - 1);

    const sort: { [key: string]: 1 | -1 } =
      query?.orderBy && query.order
        ? { [query.orderBy]: query.order === "asc" ? 1 : -1 }
        : { purchaseDate: -1 };

    const count = await Purchase.countDocuments(filterObj);

    const purchase = await Purchase.find(filterObj)
      .skip(skip)
      .limit(query.limit)
      .sort(sort);

    const data = {
      count,
      page: query?.page || 1,
      limit: query?.limit || 10,
      totalPage: Math.ceil(count / query.limit),
      data: purchase,
    };

    return data;
  }

  public async deleteById(id: string): Promise<void> {
    await Purchase.deleteOne({ _id: id });
  }

  public async updateStatus(
    id: string,
    status: EPurchaseStatus,
  ): Promise<IPurchase> {
    return await Purchase.findByIdAndUpdate(id, { status }, { new: true });
  }
}

export const purchaseRepository = new PurchaseRepository();

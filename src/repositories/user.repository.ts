import { FilterQuery } from "mongoose";

import { IUser, IUserQuery } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

class UserRepository {
  public async create(data: IUser): Promise<IUser> {
    return await User.create(data);
  }
  public async update(data: Partial<IUser>, userId: string): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, data, { new: true });
  }
  public async delete(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
  public async getList(query: IUserQuery): Promise<IUser[]> {
    const filterObj: FilterQuery<IUser> = {};
    if (query?.search) {
      filterObj.name = { $regex: query.search, $options: "i" };
    }

    const skip = query.limit * (query.page - 1);

    const sort: { [key: string]: 1 | -1 } =
      query?.orderBy && query.order
        ? { [query.orderBy]: query.order === "asc" ? 1 : -1 }
        : { createdAt: -1 };

    return await User.find(filterObj).limit(query.limit).skip(skip).sort(sort);
  }
  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId).select("+password");
  }
  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email }).select("+password");
  }
  public async findInactiveUsersByToken(lastLoginDate: Date): Promise<IUser[]> {
    try {
      return await User.aggregate([
        {
          $lookup: {
            from: Token.collection.name,
            localField: "_id",
            foreignField: "_userId",
            as: "tokens",
          },
        },
        {
          $unwind: {
            path: "$tokens",
            preserveNullAndEmptyArrays: true, // зберігаємо користувачів без токенів
          },
        },
        {
          $match: {
            $or: [
              { tokens: { $exists: false } }, // Користувачі без токенів
              { "tokens.createdAt": { $lt: lastLoginDate } }, // Користувачі, що не заходили після певної дати
            ],
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            email: { $first: "$email" },
            phone: { $first: "$phone" },
            role: { $first: "$role" },
            avatar: { $first: "$avatar" },
            status: { $first: "$status" },
            category: { $first: "$category" },
          },
        },
      ]);
    } catch (error) {
      console.error("Error fetching inactive users", error);
      throw error;
    }
  }
}

export const userRepository = new UserRepository();

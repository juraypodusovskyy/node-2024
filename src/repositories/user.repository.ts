import { IUser } from "../interfaces/user.interface";
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
  public async getList(): Promise<IUser[]> {
    return await User.find({});
  }
  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId).select("+password");
  }
  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email }).select("+password");
  }
}

export const userRepository = new UserRepository();

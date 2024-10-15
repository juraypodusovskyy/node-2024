import { configs } from "../configs/configs";
import { IUser, IUserPublicResDto } from "../interfaces/user.interface";

class UserPresent {
  public toPublicResDto(user: IUser): IUserPublicResDto {
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      status: user.status,
      category: user.category,
      role: user.role,
      avatar: user.avatar ? configs.AWS_S3_ENDPOINT + user.avatar : user.avatar,
    };
  }
}

export const userPresent = new UserPresent();

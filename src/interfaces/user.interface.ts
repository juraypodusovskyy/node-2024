import { ERole } from "../enums/role.enums";
import { EStatus } from "../enums/status.enum";

interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: ERole;
  category?: string;
  status?: EStatus;
  createdAt: Date;
  updatedAt: Date;
  avatar: string | null;
}

interface ILogUser {
  email: string;
  password: string;
}

interface ICngPassword {
  oldPassword: string;
  newPassword: string;
}

export type { IUser, ILogUser, ICngPassword };

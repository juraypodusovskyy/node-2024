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
}

interface ILogUser {
  email: string;
  password: string;
}

export type { IUser, ILogUser };

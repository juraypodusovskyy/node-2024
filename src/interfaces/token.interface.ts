import { ERole } from "../enums/role.enums";

interface IToken {
  _id?: string;
  _userId: string;
  accessToken: string;
  refreshToken: string;
}

interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

interface IPayload {
  userId: string;
  role: ERole;
}

export type { IToken, ITokenPair, IPayload };

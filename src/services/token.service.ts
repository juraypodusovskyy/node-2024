import * as jsonwebtoken from "jsonwebtoken";

import { configs } from "../configs/configs";
import { ETokenType } from "../enums/tokens.enum";
import { ApiError } from "../errors/api-error";
import { IPayload, ITokenPair } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: IPayload): ITokenPair {
    const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRATION,
    });
    const refreshToken = jsonwebtoken.sign(
      payload,
      configs.JWT_REFRESH_SECRET,
      {
        expiresIn: configs.JWT_ACCESS_EXPIRATION,
      },
    );
    return { accessToken, refreshToken };
  }

  public verifyToken(token: string, tokenType: ETokenType): IPayload {
    let secret: string;
    try {
      switch (tokenType) {
        case ETokenType.ACCESS:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case ETokenType.REFRESH:
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }
      return jsonwebtoken.verify(token, secret) as IPayload;
    } catch {
      throw new ApiError(401, "Invalid token");
    }
  }
}

export const tokenService = new TokenService();

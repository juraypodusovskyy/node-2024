import * as jsonwebtoken from "jsonwebtoken";

import { configs } from "../configs/configs";
import { ETokenType } from "../enums/tokens.enum";
import { ApiError } from "../errors/api-error";
import { IPayload, ITokenPair } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: IPayload): ITokenPair {
    const accessToken = this.generateToken(payload, ETokenType.ACCESS);
    const refreshToken = this.generateToken(payload, ETokenType.REFRESH);

    return { accessToken, refreshToken };
  }

  public generateToken(payload: IPayload, tokenType: ETokenType): string {
    const { secret, expiration } = this.getTokenConfig(tokenType);

    return jsonwebtoken.sign(payload, secret, {
      expiresIn: expiration,
    });
  }

  public verifyToken(token: string, tokenType: ETokenType): IPayload {
    const { secret } = this.getTokenConfig(tokenType);

    try {
      return jsonwebtoken.verify(token, secret) as IPayload;
    } catch {
      throw new ApiError(401, "Invalid token");
    }
  }

  private getTokenConfig(tokenType: ETokenType): {
    secret: string;
    expiration: string;
  } {
    switch (tokenType) {
      case ETokenType.ACCESS:
        return {
          secret: configs.JWT_ACCESS_SECRET,
          expiration: configs.JWT_ACCESS_EXPIRATION,
        };
      case ETokenType.REFRESH:
        return {
          secret: configs.JWT_REFRESH_SECRET,
          expiration: configs.JWT_REFRESH_EXPIRATION,
        };
      case ETokenType.ACTIVATE:
        return {
          secret: configs.JWT_ACTIVATE_SECRET,
          expiration: configs.JWT_ACTIVATE_EXPIRATION,
        };
      case ETokenType.FORGOT:
        return {
          secret: configs.JWT_FORGOT_SECRET,
          expiration: configs.JWT_FORGOT_EXPIRATION,
        };
      default:
        throw new ApiError(400, "Invalid token type");
    }
  }
}

export const tokenService = new TokenService();

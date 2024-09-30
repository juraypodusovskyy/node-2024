import { IToken, ITokenPair } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepositori {
  public async create(
    tokens: ITokenPair,
    _userId: string,
  ): Promise<ITokenPair> {
    const { accessToken, refreshToken } = (await Token.create({
      ...tokens,
      _userId,
    })) as unknown as IToken;
    return { accessToken, refreshToken };
  }
  public async delte(params: Partial<IToken>): Promise<void> {
    await Token.deleteMany(params);
  }
  public async getByParams(params: Partial<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }
}

export const tokenRepositori = new TokenRepositori();

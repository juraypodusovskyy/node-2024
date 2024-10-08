import { IActiveToken } from "../interfaces/token.interface";
import { ActiveToken } from "../models/active-token";

class ActivateTokenRepository {
  public async create(activeToken: IActiveToken): Promise<IActiveToken> {
    return await ActiveToken.create(activeToken);
  }

  public async findByParams(dto: Partial<IActiveToken>): Promise<IActiveToken> {
    return await ActiveToken.findOne(dto);
  }

  public async delete(userId: string): Promise<void> {
    await ActiveToken.deleteMany({ _userId: userId });
  }
}

export const activateTokenRepository = new ActivateTokenRepository();

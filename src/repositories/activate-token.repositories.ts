import { IActivateToken } from "../interfaces/token.interface";
import { ActivateToken } from "../models/activate-token";

class ActivateTokenRepository {
  public async create(activateToken: IActivateToken): Promise<IActivateToken> {
    return await ActivateToken.create(activateToken);
  }

  public async findByParams(
    dto: Partial<IActivateToken>,
  ): Promise<IActivateToken> {
    return await ActivateToken.findOne(dto);
  }

  public async delete(userId: string): Promise<void> {
    await ActivateToken.deleteMany({ _userId: userId });
  }
}

export const activateTokenRepository = new ActivateTokenRepository();

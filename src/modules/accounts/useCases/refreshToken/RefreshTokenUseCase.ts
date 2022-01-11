import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  email: string;
  sub: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secretRefreshToken) as IPayload;
    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exists.");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: sub,
      expiresIn: auth.expiresInRefreshToken,
    });

    const expires_date = this.dateProvider.datePlusDays(
      this.dateProvider.dateNow(),
      auth.expiresRefreshTokenDays
    );

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: refreshToken,
      expires_date,
    });

    const newToken = sign({}, auth.secretToken, {
      subject: user_id,
      expiresIn: auth.expiresInToken,
    });

    return { token: newToken, refreshToken };
  }
}

export { RefreshTokenUseCase };

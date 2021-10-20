import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const {
      secretToken,
      secretRefreshToken,
      expiresInToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = auth;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User email or password incorrect.", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("User email or password incorrect.", 401);
    }

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    });

    const dateNow = this.dateProvider.dateNow();
    const expiresDateRefreshToken = this.dateProvider.datePlusDays(
      dateNow,
      expiresRefreshTokenDays
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: refreshToken,
      expires_date: expiresDateRefreshToken,
    });

    const session = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };

    return session;
  }
}

export { AuthenticateUserUseCase };

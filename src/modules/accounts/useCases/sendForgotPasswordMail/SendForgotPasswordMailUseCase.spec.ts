import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mailProvider/in-memory/MailProviderInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

describe("Send Forgot Password Mail", () => {
  let createUserUseCase: CreateUserUseCase;
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let mailProvider: MailProviderInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to send a forgot password mail to user", () => {});
});

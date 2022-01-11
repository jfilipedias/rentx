import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

describe("Send Forgot Password Mail", () => {
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
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      name: "User Name",
      email: "user@email.com",
      password: "SecretPassword123",
      driver_license: "684621",
    });

    await sendForgotPasswordMailUseCase.execute("user@email.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should be able to create an user token", async () => {
    const createTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      name: "User Name",
      email: "user@email.com",
      password: "SecretPassword123",
      driver_license: "684621",
    });

    await sendForgotPasswordMailUseCase.execute("user@email.com");

    expect(createTokenMail).toHaveBeenCalled();
  });

  it("Should not be able to send a forgot password mail to a non-existing user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("non-existing-user@email.com")
    ).rejects.toEqual(new AppError("User does not exists.", 401));
  });
});

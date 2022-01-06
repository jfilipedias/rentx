import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  sendMail(to: string, subject: string, body: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { EtherealMailProvider };
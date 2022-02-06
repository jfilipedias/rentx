import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
  }
  async delete(file: string, folder: string): Promise<void> {
  }
}

export { LocalStorageProvider };

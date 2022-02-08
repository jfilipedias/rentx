import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMapper {
  static toDTO({
    id,
    name,
    email,
    avatar,
    avatar_url,
    driver_license,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}

export { UserMapper };

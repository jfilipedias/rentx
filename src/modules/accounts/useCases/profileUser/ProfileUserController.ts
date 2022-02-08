import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const { id } = request.user;
    const profile = await profileUserUseCase.execute(id);

    return response.json(profile);
  }
}

export { ProfileUserController };

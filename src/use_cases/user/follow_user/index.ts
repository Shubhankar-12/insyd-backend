import { FollowUserController } from "./controller";
import { FollowUserUseCase } from "./usecase";

const followUserUseCase = new FollowUserUseCase();

export const followUserController = new FollowUserController(followUserUseCase);

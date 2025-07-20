import { GetUserController } from "./controller";
import { GetUserUseCase } from "./usecase";

const getUserUseCase = new GetUserUseCase();

export const getUserController = new GetUserController(getUserUseCase);

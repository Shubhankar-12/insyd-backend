import { CreateUserController } from "./controller";
import { CreateUserUseCase } from "./usecase";

const createUserUseCase = new CreateUserUseCase();

export const createUserController = new CreateUserController(createUserUseCase);

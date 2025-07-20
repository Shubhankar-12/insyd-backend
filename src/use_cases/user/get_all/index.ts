import { GetAllUserController } from "./controller";
import { GetAllUserUseCase } from "./usecase";

const getAllUserUseCase = new GetAllUserUseCase();

export const getAllUserController = new GetAllUserController(getAllUserUseCase);

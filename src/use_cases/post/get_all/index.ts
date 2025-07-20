import { GetAllPostController } from "./controller";
import { GetAllPostUseCase } from "./usecase";

const getAllPostUseCase = new GetAllPostUseCase();

export const getAllPostController = new GetAllPostController(getAllPostUseCase);

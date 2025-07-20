import { CreateLikeController } from "./controller";
import { CreateLikeUseCase } from "./usecase";

const createLikeUseCase = new CreateLikeUseCase();

export const createLikeController = new CreateLikeController(createLikeUseCase);

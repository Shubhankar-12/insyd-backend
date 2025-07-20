import { CreatePostController } from "./controller";
import { CreatePostUseCase } from "./usecase";

const createPostUseCase = new CreatePostUseCase();

export const createPostController = new CreatePostController(createPostUseCase);

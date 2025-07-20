import { CreateCommentController } from "./controller";
import { CreateCommentUseCase } from "./usecase";

const createCommentUseCase = new CreateCommentUseCase();

export const createCommentController = new CreateCommentController(
  createCommentUseCase
);

import express from "express";

import { createPostController } from "../use_cases/post/create";
import { createCommentController } from "../use_cases/post/create_comment";
import { createLikeController } from "../use_cases/post/create_like";
import { getAllPostController } from "../use_cases/post/get_all";
export const postRouter = express.Router();

postRouter.post("/create", createPostController.execute());

postRouter.get("/list", getAllPostController.execute());

postRouter.post("/like", createLikeController.execute());

postRouter.post("/comment", createCommentController.execute());

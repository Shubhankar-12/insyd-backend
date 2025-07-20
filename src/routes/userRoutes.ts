import express from "express";
import { createUserController } from "../use_cases/user/create";
import { getAllUserController } from "../use_cases/user/get_all";
import { followUserController } from "../use_cases/user/follow_user";

export const userRouter = express.Router();

userRouter.post("/create", createUserController.execute());

userRouter.get("/list", getAllUserController.execute());

userRouter.post("/update-follow", followUserController.execute());

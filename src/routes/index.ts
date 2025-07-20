import express from "express";
import { userRouter } from "./userRoutes";
import { postRouter } from "./postRoutes";
import { notificationRouter } from "./notificationRoutes";

const apiRouter = express.Router();
apiRouter.use("/user", userRouter);
apiRouter.use("/post", postRouter);
apiRouter.use("/notification", notificationRouter);

export { apiRouter };

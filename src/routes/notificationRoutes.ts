import express from "express";

import { getUserNotificationController } from "../use_cases/user/get_all_notifications";
import { markNotificationController } from "../use_cases/user/mark_notification";
export const notificationRouter = express.Router();

notificationRouter.get("/list", getUserNotificationController.execute());

notificationRouter.post("/mark", markNotificationController.execute());

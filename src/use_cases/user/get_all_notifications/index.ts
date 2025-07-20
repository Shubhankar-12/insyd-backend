import { GetUserNotificationController } from "./controller";
import { GetUserNotificationUseCase } from "./usecase";

const getUserNotificationUseCase = new GetUserNotificationUseCase();

export const getUserNotificationController = new GetUserNotificationController(
  getUserNotificationUseCase
);

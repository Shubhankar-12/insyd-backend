import { MarkNotificationController } from "./controller";
import { MarkNotificationUseCase } from "./usecase";

const markNotificationUseCase = new MarkNotificationUseCase();

export const markNotificationController = new MarkNotificationController(
  markNotificationUseCase
);

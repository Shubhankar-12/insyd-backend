import { model } from "mongoose";
import { NotificationSchema } from "./schema";
import { INotificationDocument } from "./types";

export const NotificationModel = model<INotificationDocument>(
  "notification",
  NotificationSchema,
  "notifications"
);

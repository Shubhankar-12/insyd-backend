import { Document } from "mongoose";

export interface INotification {
  notification_id: string;
  sender: string;
  receiver: string;
  type: string;
  content?: string;
  isRead: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface INotificationDocument extends INotification, Document {}

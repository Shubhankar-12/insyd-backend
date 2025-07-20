import { MarkNotificationRequest } from "./request";
import bcrypt from "bcrypt";

export interface MarkNotificationDto {
  user_id: string;
  notification_id?: string;
  markAll?: boolean;
}

export class MarkNotificationDtoConverter {
  private output_object: MarkNotificationDto;

  constructor(data: MarkNotificationRequest) {
    this.output_object = {
      user_id: data.user_id,
      notification_id: data.notification_id,
      markAll: data.markAll !== undefined ? data.markAll : undefined,
    };
  }

  public getDtoObject(): MarkNotificationDto {
    return this.output_object;
  }
}

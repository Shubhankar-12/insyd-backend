import { GetUserNotificationRequest } from "./request";

export interface GetUserNotificationDto {
  user_id: string;
  skip?: number;
  limit?: number;
}

export class GetUserNotificationDtoConverter {
  private output_object: GetUserNotificationDto;

  constructor(data: GetUserNotificationRequest) {
    this.output_object = {
      user_id: data.user_id,
      skip: data.skip ? Number(data.skip) : 0,
    };
    if (data.limit) {
      this.output_object.limit = Number(data.limit);
    }
  }

  public getDtoObject(): GetUserNotificationDto {
    return this.output_object;
  }
}

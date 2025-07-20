import { GetUserRequest } from "./request";

export interface GetUserDto {
  user_id: string;
}

export class GetUserDtoConverter {
  private output_object: GetUserDto;

  constructor(data: GetUserRequest) {
    this.output_object = {
      user_id: data.user_id,
    };
  }

  public getDtoObject(): GetUserDto {
    return this.output_object;
  }
}

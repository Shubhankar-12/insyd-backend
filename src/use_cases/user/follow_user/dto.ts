import { FollowUserRequest } from "./request";
import bcrypt from "bcrypt";

export interface FollowUserDto {
  user_id: string;
  follower_id: string;
  type: string;
}

export class FollowUserDtoConverter {
  private output_object: FollowUserDto;

  constructor(data: FollowUserRequest) {
    this.output_object = {
      user_id: data.user_id,
      follower_id: data.follower_id,
      type: data.type,
    };
  }

  public getDtoObject(): FollowUserDto {
    return this.output_object;
  }
}

import { CreateLikeRequest } from "./request";
import bcrypt from "bcrypt";

export interface CreateLikeDto {
  post_id: string;
  user_id: string;
}

export class CreateLikeDtoConverter {
  private output_object: CreateLikeDto;

  constructor(data: CreateLikeRequest) {
    this.output_object = {
      post_id: data.post_id,
      user_id: data.user_id,
    };
  }

  public getDtoObject(): CreateLikeDto {
    return this.output_object;
  }
}

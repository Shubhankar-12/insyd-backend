import { CreateCommentRequest } from "./request";
import bcrypt from "bcrypt";

export interface CreateCommentDto {
  post_id: string;
  author_id: string;
  content: string;
  status?: string;
}

export class CreateCommentDtoConverter {
  private output_object: CreateCommentDto;

  constructor(data: CreateCommentRequest) {
    this.output_object = {
      post_id: data.post_id,
      author_id: data.author_id,
      content: data.content,
      status: data.status || "ENABLED",
    };
  }

  public getDtoObject(): CreateCommentDto {
    return this.output_object;
  }
}

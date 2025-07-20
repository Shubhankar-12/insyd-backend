import { CreatePostRequest } from "./request";
import bcrypt from "bcrypt";

export interface CreatePostDto {
  author_id: string;
  title: string;
  content: string;
  likes?: string[];
  comments?: string[];
  status: string;
}

export class CreatePostDtoConverter {
  private output_object: CreatePostDto;

  constructor(data: CreatePostRequest) {
    this.output_object = {
      author_id: data.author_id,
      title: data.title,
      content: data.content,
      likes: data.likes || [],
      comments: data.comments || [],

      status: data.status || "ENABLED",
    };
  }

  public getDtoObject(): CreatePostDto {
    return this.output_object;
  }
}

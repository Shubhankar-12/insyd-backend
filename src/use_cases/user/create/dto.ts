import { CreateUserRequest } from "./request";
import bcrypt from "bcrypt";

export interface CreateUserDto {
  full_name: string;
  email: string;
  followers?: string[];
  following?: string[];
  status?: string;
}

export class CreateUserDtoConverter {
  private output_object: CreateUserDto;

  constructor(data: CreateUserRequest) {
    this.output_object = {
      full_name: data.full_name,
      email: data.email,
      followers: data.followers || [],
      following: data.following || [],
      status: data.status || "ENABLED",
    };
  }

  public getDtoObject(): CreateUserDto {
    return this.output_object;
  }
}

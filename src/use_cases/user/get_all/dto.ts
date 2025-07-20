import { GetAllUserRequest } from "./request";

export interface GetAllUserDto {
  skip?: number;
  limit?: number;
  search?: string;
}

export class GetAllUserDtoConverter {
  private output_object: GetAllUserDto;

  constructor(data: GetAllUserRequest) {
    this.output_object = {
      skip: data.skip ? Number(data.skip) : 0,

      search: data.search ? data.search : "",
    };
    if (data.limit) {
      this.output_object.limit = Number(data.limit);
    }
  }

  public getDtoObject(): GetAllUserDto {
    return this.output_object;
  }
}

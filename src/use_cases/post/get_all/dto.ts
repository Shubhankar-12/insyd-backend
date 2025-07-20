import { GetAllPostRequest } from "./request";

export interface GetAllPostDto {
  skip?: number;
  limit?: number;
  search?: string;
}

export class GetAllPostDtoConverter {
  private output_object: GetAllPostDto;

  constructor(data: GetAllPostRequest) {
    this.output_object = {
      skip: data.skip ? Number(data.skip) : 0,

      search: data.search ? data.search : "",
    };
    if (data.limit) {
      this.output_object.limit = Number(data.limit);
    }
  }

  public getDtoObject(): GetAllPostDto {
    return this.output_object;
  }
}

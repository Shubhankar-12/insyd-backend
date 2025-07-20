import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { CreatePostRequest } from "./request";

export class CreatePostValidator extends BaseValidator {
  private request: CreatePostRequest;
  constructor(request: CreatePostRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateId(this.request.author_id) &&
      errors.push("Invalid author_id format");

    this.request.status &&
      !this.validateStatus(this.request.status) &&
      errors.push("Invalid status format");

    return errors;
  }
}

import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { CreateCommentRequest } from "./request";

export class CreateCommentValidator extends BaseValidator {
  private request: CreateCommentRequest;
  constructor(request: CreateCommentRequest) {
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

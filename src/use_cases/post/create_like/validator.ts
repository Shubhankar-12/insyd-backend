import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { CreateLikeRequest } from "./request";

export class CreateLikeValidator extends BaseValidator {
  private request: CreateLikeRequest;
  constructor(request: CreateLikeRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateId(this.request.user_id) &&
      errors.push("Invalid user_id format");

    this.request.post_id &&
      !this.validateId(this.request.post_id) &&
      errors.push("Invalid post_id format");

    return errors;
  }
}

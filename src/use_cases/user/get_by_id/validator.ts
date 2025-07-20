import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetUserRequest } from "./request";

export class GetUserValidator extends BaseValidator {
  private request: GetUserRequest;
  constructor(request: GetUserRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateId(this.request.user_id) &&
      errors.push("Invalid user_id format");

    return errors;
  }
}

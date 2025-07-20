import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { CreateUserRequest } from "./request";

export class CreateUserValidator extends BaseValidator {
  private request: CreateUserRequest;
  constructor(request: CreateUserRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateEmail(this.request.email) &&
      errors.push("Invalid email format");

    this.request.status &&
      !this.validateStatus(this.request.status) &&
      errors.push("Invalid status format");

    return errors;
  }
}

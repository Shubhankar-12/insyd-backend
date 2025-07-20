import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetAllUserRequest } from "./request";

export class GetAllUserValidator extends BaseValidator {
  private request: GetAllUserRequest;
  constructor(request: GetAllUserRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    this.request.skip &&
      !this.validateNumber(this.request.skip) &&
      errors.push("Invalid skip format");

    this.request.limit &&
      !this.validateNumber(this.request.limit) &&
      errors.push("Invalid limit format");

    return errors;
  }
}

import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetAllPostRequest } from "./request";

export class GetAllPostValidator extends BaseValidator {
  private request: GetAllPostRequest;
  constructor(request: GetAllPostRequest) {
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

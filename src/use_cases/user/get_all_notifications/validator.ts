import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetUserNotificationRequest } from "./request";

export class GetUserNotificationValidator extends BaseValidator {
  private request: GetUserNotificationRequest;
  constructor(request: GetUserNotificationRequest) {
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

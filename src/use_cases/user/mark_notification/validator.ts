import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { MarkNotificationRequest } from "./request";

export class MarkNotificationValidator extends BaseValidator {
  private request: MarkNotificationRequest;
  constructor(request: MarkNotificationRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateId(this.request.user_id) &&
      errors.push("Invalid user_id format");
    this.request.notification_id &&
      !this.validateId(this.request.notification_id) &&
      errors.push("Invalid notification_id format");

    return errors;
  }
}

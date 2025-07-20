import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { FollowUserRequest } from "./request";

export class FollowUserValidator extends BaseValidator {
  private request: FollowUserRequest;
  constructor(request: FollowUserRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateId(this.request.user_id) &&
      errors.push("Invalid user_id format");
    !this.validateId(this.request.follower_id) &&
      errors.push("Invalid follower_id format");

    this.request.type &&
      !this.validateEnum(this.request.type, ["follow", "unfollow"]) &&
      errors.push("Invalid type format");

    return errors;
  }
}

import { IUser } from "../../../db/user";
import { notificationQueries, userQueries } from "../../../db/queries";
import { ErrorResponse } from "../../../types/all_types";
import { MarkNotificationDto } from "./dto";

// response will have token and user data or error message

interface FollowerResponse {
  message: string;
}

export class MarkNotificationUseCase {
  async execute(
    request: MarkNotificationDto
  ): Promise<FollowerResponse | ErrorResponse> {
    const resp = await notificationQueries.markNotificationAsRead(request);

    if (resp) {
      return {
        message: "Notification marked successfully",
      };
    }

    return {
      error: "Error marking notification",
    };
  }
}

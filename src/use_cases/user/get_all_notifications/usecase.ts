import { IUser } from "../../../db/user";
import { notificationQueries } from "../../../db/queries";
import { ErrorResponse } from "../../../types/all_types";
import { GetUserNotificationDto } from "./dto";

// response will have token and user data or error message

export class GetUserNotificationUseCase {
  async execute(request: GetUserNotificationDto): Promise<any> {
    const user = await notificationQueries.getUserNotifications(request);

    if (user[0].paginatedResults.length == 0) {
      user[0].totalCount.push({ count: 0 });
    }

    return user[0];
  }
}

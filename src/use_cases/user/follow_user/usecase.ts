import { IUser } from "../../../db/user";
import { notificationQueries, userQueries } from "../../../db/queries";
import { ErrorResponse } from "../../../types/all_types";
import { FollowUserDto } from "./dto";
import { onlineUsers } from "../../../utils/socket"; // import online user map
import { Types } from "mongoose";

interface FollowerResponse {
  message: string;
}

export class FollowUserUseCase {
  async execute(
    request: FollowUserDto
  ): Promise<FollowerResponse | ErrorResponse> {
    if (request.type === "follow") {
      const follower = await userQueries.getUserById(request.follower_id);

      if (!follower) {
        return {
          error: "Follower not found",
        };
      }

      const user = await userQueries.addFollower(request);
      await userQueries.addFollowing(request);

      // Create the notification in DB
      const notification = await notificationQueries.createNotification({
        sender: request.follower_id,
        receiver: request.user_id,
        type: "FOLLOW",
        content: `${follower.full_name} followed you`,
      });

      // 🔔 Emit real-time notification if the user is online
      const socketId = onlineUsers.get(request.user_id.toString());
      console.log("🚀 Socket ID:", socketId);

      if (socketId && global.io) {
        const newNotification = global.io
          .to(socketId)
          .emit("new_notification", {
            _id: notification._id,
            type: notification.type,
            content: notification.content,
            sender: {
              _id: follower._id,
              full_name: follower.full_name,
            },
            createdAt: notification.createdAt,
          });
        console.log("🚀 New notification emitted:", newNotification);
      }

      if (user) {
        return {
          message: "User followed successfully",
        };
      }
    } else if (request.type === "unfollow") {
      const user = await userQueries.removeFollower(request);
      await userQueries.removeFollowing(request);
      if (user) {
        return {
          message: "User unfollowed successfully",
        };
      }
    }

    return {
      error: "Error creating user",
    };
  }
}

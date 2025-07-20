import { INotificationDocument, NotificationModel } from "../notification";
import { Types, Model } from "mongoose";

const ObjectId = Types.ObjectId;

export class NotificationQueries {
  private ngoModel: Model<INotificationDocument>;

  constructor() {
    this.ngoModel = NotificationModel;
  }

  createNotification = async (data: any): Promise<any> => {
    return await this.ngoModel.create(data);
  };

  // mark all notifications as read id markAll is true
  markNotificationAsRead = async (data: any): Promise<any> => {
    if (data.markAll) {
      return await this.ngoModel.updateMany(
        { receiver: data.user_id },
        { isRead: true }
      );
    }
    return await this.ngoModel.findOneAndUpdate(
      { _id: data.notification_id },
      { isRead: true }
    );
  };

  getUserNotifications = async (data: any): Promise<any> => {
    let aggregateQuery: any[] = [];

    aggregateQuery.push({
      $match: {
        receiver: new ObjectId(data.user_id),
      },
    });

    aggregateQuery.push({
      $sort: {
        created_at: -1,
      },
    });

    aggregateQuery.push({
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "sender",
        pipeline: [
          {
            $project: {
              _id: 0,
              user_id: "$_id",
              display_id: 1,
              user_name: 1,
              full_name: 1,
            },
          },
        ],
      },
    });

    aggregateQuery.push({
      $project: {
        _id: 0,
        notification_id: "$_id",
        sender: 1,
        receiver: 1,
        type: 1,
        content: 1,
        isRead: 1,
        created_at: 1,
        updated_at: 1,
      },
    });

    const $facet: any = {
      paginatedResults: [],
      totalCount: [{ $count: "count" }],
    };
    if (data.skip != undefined) {
      $facet.paginatedResults.push({ $skip: data.skip });
    }
    if (data.limit != undefined) {
      $facet.paginatedResults.push({ $limit: data.limit });
    }
    aggregateQuery.push({ $facet });

    return await this.ngoModel.aggregate(aggregateQuery);
  };
}

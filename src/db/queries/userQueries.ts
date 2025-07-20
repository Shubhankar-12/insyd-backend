import { IUserDocument, UserModel } from "../user";
import { Types, Model } from "mongoose";

const ObjectId = Types.ObjectId;

export class UserQueries {
  private ngoModel: Model<IUserDocument>;

  constructor() {
    this.ngoModel = UserModel;
  }

  createUser = async (data: any): Promise<any> => {
    return await this.ngoModel.create(data);
  };

  addFollower = async (data: any): Promise<any> => {
    return await this.ngoModel.findOneAndUpdate(
      { _id: data.user_id },
      { $addToSet: { followers: data.follower_id } }
    );
  };

  addFollowing = async (data: any): Promise<any> => {
    return await this.ngoModel.findOneAndUpdate(
      { _id: data.follower_id },
      { $addToSet: { following: data.user_id } }
    );
  };

  removeFollower = async (data: any): Promise<any> => {
    return await this.ngoModel.findOneAndUpdate(
      { _id: data.user_id },
      { $pull: { followers: data.follower_id } }
    );
  };

  removeFollowing = async (data: any): Promise<any> => {
    return await this.ngoModel.findOneAndUpdate(
      { _id: data.follower_id },
      { $pull: { following: data.user_id } }
    );
  };

  getDuplicateUser = async (email: string): Promise<any> => {
    return await this.ngoModel.findOne({ email: email, status: "ENABLED" });
  };

  getAllUsers = async (data: any): Promise<any> => {
    let aggregateQuery: any[] = [];

    aggregateQuery.push({
      $match: {
        status: {
          $ne: "DISABLED",
        },
      },
    });

    if (data.search) {
      const dataSearch = data.search
        ? data.search.replace(/[()]/g, "\\$&")
        : "";

      aggregateQuery.push({
        $match: {
          $or: [
            { full_name: { $regex: dataSearch, $options: "i" } },
            { display_id: { $regex: dataSearch, $options: "i" } },
          ],
        },
      });
    }

    aggregateQuery.push({
      $sort: {
        registered_on: 1,
      },
    });

    aggregateQuery.push({
      $project: {
        _id: 0,
        user_id: "$_id",
        display_id: 1,
        full_name: 1,
        email: 1,
        followers: 1,
        following: 1,
        status: 1,
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

  getUserById = async (user_id: string): Promise<any> => {
    return await this.ngoModel.findOne({
      _id: user_id,
      status: "ENABLED",
    });
  };

  getUser = async (data: any): Promise<any> => {
    let aggregateQuery: any[] = [];

    aggregateQuery.push({
      $match: {
        status: {
          $ne: "DISABLED",
        },
      },
    });

    aggregateQuery.push({
      $match: {
        _id: new ObjectId(data.user_id),
      },
    });

    aggregateQuery.push({
      $sort: {
        registered_on: 1,
      },
    });

    aggregateQuery.push({
      $project: {
        _id: 0,
        user_id: "$_id",
        display_id: 1,
        full_name: 1,
        email: 1,
        followers: 1,
        following: 1,
        status: 1,
        created_at: 1,
        updated_at: 1,
      },
    });

    return await this.ngoModel.aggregate(aggregateQuery);
  };
}

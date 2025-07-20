import e from "cors";
import { IPostDocument, PostModel } from "../post";
import { Types, Model } from "mongoose";

const ObjectId = Types.ObjectId;

export class PostQueries {
  private postModel: Model<IPostDocument>;

  constructor() {
    this.postModel = PostModel;
  }

  createPost = async (data: any): Promise<any> => {
    return await this.postModel.create(data);
  };

  getAllPosts = async (data: any): Promise<any> => {
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
            { title: { $regex: dataSearch, $options: "i" } },
            { content: { $regex: dataSearch, $options: "i" } },
          ],
        },
      });
    }

    if (data.author_id) {
      aggregateQuery.push({
        $match: {
          author_id: data.author_id,
        },
      });
    }

    aggregateQuery.push({
      $sort: {
        created_at: -1,
      },
    });

    aggregateQuery.push({
      $lookup: {
        from: "users",
        localField: "author_id",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              _id: 0,
              user_id: "$_id",
              user_name: 1,
              full_name: 1,
              email: 1,
            },
          },
        ],
      },
    });

    aggregateQuery.push({
      $unwind: {
        path: "$user",
      },
    });

    aggregateQuery.push({
      $lookup: {
        from: "users",
        localField: "likes",
        foreignField: "_id",
        as: "users_likes",
        pipeline: [
          {
            $project: {
              _id: 0,
              user_id: "$_id",
              user_name: 1,
              full_name: 1,
              email: 1,
            },
          },
        ],
      },
    });

    aggregateQuery.push({
      $lookup: {
        from: "comments",
        localField: "post_id",
        foreignField: "post_id",
        as: "user_comments",
      },
    });

    aggregateQuery.push({
      $project: {
        _id: 0,
        post_id: "$_id",
        author_id: 1,
        title: 1,
        content: 1,
        user: 1,
        users_likes: 1,
        user_comments: 1,
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

    return await this.postModel.aggregate(aggregateQuery);
  };

  getPost = async (data: any): Promise<any> => {
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
        _id: new ObjectId(data.post_id),
      },
    });

    aggregateQuery.push({
      $lookup: {
        from: "users",
        localField: "author_id",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              _id: 0,
              user_id: "$_id",
              user_name: 1,
              full_name: 1,
              email: 1,
            },
          },
        ],
      },
    });

    aggregateQuery.push({
      $unwind: {
        path: "$user",
      },
    });

    aggregateQuery.push({
      $lookup: {
        from: "users",
        localField: "likes",
        foreignField: "_id",
        as: "users_likes",
        pipeline: [
          {
            $project: {
              _id: 0,
              user_id: "$_id",
              user_name: 1,
              full_name: 1,
              email: 1,
            },
          },
        ],
      },
    });

    aggregateQuery.push({
      $lookup: {
        from: "comments",
        localField: "post_id",
        foreignField: "post_id",
        as: "user_comments",
      },
    });

    aggregateQuery.push({
      $project: {
        _id: 0,
        post_id: "$_id",
        author_id: 1,
        title: 1,
        content: 1,
        user: 1,
        users_likes: 1,
        user_comments: 1,

        status: 1,
        created_at: 1,
        updated_at: 1,
      },
    });

    return await this.postModel.aggregate(aggregateQuery);
  };

  updatePost = async (data: any): Promise<any> => {
    return await this.postModel.updateOne(
      { _id: data.post_id },
      {
        $set: data,
      }
    );
  };

  addLike = async (data: any): Promise<any> => {
    return await this.postModel.updateOne(
      { _id: data.post_id },
      { $addToSet: { likes: data.user_id } }
    );
  };

  removeLike = async (data: any): Promise<any> => {
    return await this.postModel.updateOne(
      { _id: data.post_id },
      { $pull: { likes: data.user_id } }
    );
  };

  addComment = async (data: any): Promise<any> => {
    return await this.postModel.updateOne(
      { _id: data.post_id },
      { $addToSet: { comments: data } }
    );
  };

  removeComment = async (data: any): Promise<any> => {
    return await this.postModel.updateOne(
      { _id: data.post_id },
      { $pull: { comments: data } }
    );
  };
}

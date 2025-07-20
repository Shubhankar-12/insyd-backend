import { Schema, Types } from "mongoose";

const ObjectId = Types.ObjectId;

export const PostSchema = new Schema(
  {
    author_id: {
      type: ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: [ObjectId],
    },
    comments: {
      type: [ObjectId],
    },
    status: {
      type: String,
      default: "ENABLED",
      enum: ["ENABLED", "DISABLED"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

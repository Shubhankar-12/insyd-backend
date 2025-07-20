import { Schema, Types } from "mongoose";

const ObjectId = Types.ObjectId;

export const CommentSchema = new Schema(
  {
    author_id: {
      type: ObjectId,
      required: true,
    },
    post_id: {
      type: ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
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

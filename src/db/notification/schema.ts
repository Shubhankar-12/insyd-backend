import { Schema, Types } from "mongoose";

const ObjectId = Types.ObjectId;

export const NotificationSchema = new Schema(
  {
    sender: { type: ObjectId, required: true },
    receiver: { type: ObjectId, required: true },
    type: {
      type: String,
      enum: ["FOLLOW", "COMMENT", "POST", "LIKE"],
      required: true,
    },
    content: { type: String },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

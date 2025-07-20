import { Schema, Types } from "mongoose";
import { generateDisplayId } from "../../utils/general_utils";

const ObjectId = Types.ObjectId;

export const UserSchema = new Schema(
  {
    display_id: { type: String, default: () => generateDisplayId() },

    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    followers: {
      type: [ObjectId],
    },
    following: {
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

import { model } from "mongoose";
import { CommentSchema } from "./schema";
import { ICommentDocument } from "./types";

export const CommentModel = model<ICommentDocument>(
  "comment",
  CommentSchema,
  "comments"
);

import { Document } from "mongoose";

export interface IComment {
  comment_id: string;
  post_id: string;
  author_id: string;
  content?: string;
  status?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICommentDocument extends IComment, Document {}

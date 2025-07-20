import { Document } from "mongoose";

export interface IPost {
  post_id: string;
  author_id: string;
  title: string;
  content: string;
  likes?: string[];
  comments?: string[];
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface IPostDocument extends IPost, Document {}

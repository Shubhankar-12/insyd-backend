import { Document } from "mongoose";

export interface IUser {
  user_id: string;
  display_id: string;
  full_name: string;
  email: string;
  followers?: string[];
  following?: string[];
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserDocument extends IUser, Document {}

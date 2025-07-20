import { model } from "mongoose";
import { PostSchema } from "./schema";
import { IPostDocument } from "./types";

export const PostModel = model<IPostDocument>("post", PostSchema, "posts");

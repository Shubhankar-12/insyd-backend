/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CreatePostRequest {
  author_id: string;
  title: string;
  content: string;
  likes?: string[];
  comments?: string[];
  status: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CreateCommentRequest {
  post_id: string;
  author_id: string;
  content: string;
  status?: string;
}

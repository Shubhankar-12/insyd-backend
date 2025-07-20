import { IComment } from "../../../db/comment";
import { postQueries } from "../../../db/queries";
import { ErrorResponse } from "../../../types/all_types";
import { CreateCommentDto } from "./dto";

export class CreateCommentUseCase {
  async execute(request: CreateCommentDto): Promise<IComment | ErrorResponse> {
    const user = await postQueries.addComment(request);
    if (user) {
      return {
        comment_id: user._id.toString(),
        post_id: user.post_id,
        author_id: user.author_id,
        content: user.content,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    }

    return {
      error: "Error creating comment",
    };
  }
}

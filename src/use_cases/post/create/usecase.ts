import { IPost } from "../../../db/post";
import { postQueries } from "../../../db/queries";
import { ErrorResponse } from "../../../types/all_types";
import { CreatePostDto } from "./dto";

export class CreatePostUseCase {
  async execute(request: CreatePostDto): Promise<IPost | ErrorResponse> {
    const user = await postQueries.createPost(request);
    if (user) {
      return {
        post_id: user._id.toString(),
        author_id: user.author_id,
        title: user.title,
        content: user.content,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    }

    return {
      error: "Error creating user",
    };
  }
}

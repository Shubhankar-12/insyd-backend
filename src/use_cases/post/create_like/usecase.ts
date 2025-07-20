import { postQueries } from "../../../db/queries";
import { ErrorResponse } from "../../../types/all_types";
import { CreateLikeDto } from "./dto";

interface ILike {
  post_id: string;
  user_id: string;
}

export class CreateLikeUseCase {
  async execute(request: CreateLikeDto): Promise<ILike | ErrorResponse> {
    const user = await postQueries.addLike(request);
    if (user) {
      return {
        post_id: user.post_id,
        user_id: user.user_id,
      };
    }

    return {
      error: "Error creating like",
    };
  }
}

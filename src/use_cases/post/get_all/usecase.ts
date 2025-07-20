import { postQueries } from "../../../db/queries";
import { GetAllPostDto } from "./dto";

// response will have token and user data or error message

export class GetAllPostUseCase {
  async execute(request: GetAllPostDto): Promise<any> {
    const user = await postQueries.getAllPosts(request);

    if (user[0].paginatedResults.length == 0) {
      user[0].totalCount.push({ count: 0 });
    }

    return user[0];
  }
}

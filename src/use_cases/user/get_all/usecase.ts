import { IUser } from "../../../db/user";
import { userQueries } from "../../../db/queries";
import { ErrorResponse } from "../../../types/all_types";
import { GetAllUserDto } from "./dto";

// response will have token and user data or error message

export class GetAllUserUseCase {
  async execute(request: GetAllUserDto): Promise<any> {
    const user = await userQueries.getAllUsers(request);

    if (user[0].paginatedResults.length == 0) {
      user[0].totalCount.push({ count: 0 });
    }

    return user[0];
  }
}

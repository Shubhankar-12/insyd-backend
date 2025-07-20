import { IUser } from "../../../db/user";
import { userQueries } from "../../../db/queries";
import { ErrorResponse } from "../../../types/all_types";
import { GetUserDto } from "./dto";

// response will have token and user data or error message

export class GetUserUseCase {
  async execute(request: GetUserDto): Promise<any> {
    const user = await userQueries.getUser(request);
    if (user.length == 0) {
      return {
        error: "User not found",
      };
    }
    return user[0];
  }
}

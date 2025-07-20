import { IUser } from "../../../db/user";
import { userQueries } from "../../../db/queries";
import { ErrorResponse } from "../../../types/all_types";
import { CreateUserDto } from "./dto";

// response will have token and user data or error message

export class CreateUserUseCase {
  async execute(request: CreateUserDto): Promise<IUser | ErrorResponse> {
    const existingUser = await userQueries.getDuplicateUser(request.email);
    if (existingUser) {
      return {
        error: "User already exists",
      };
    }
    const user = await userQueries.createUser(request);
    if (user) {
      return {
        user_id: user._id.toString(),
        display_id: user.display_id,
        full_name: user.full_name,
        email: user.email,
        followers: user.followers,
        following: user.following,
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

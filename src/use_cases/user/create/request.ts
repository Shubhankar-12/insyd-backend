/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CreateUserRequest {
  full_name: string;
  email: string;
  followers?: string[];
  following?: string[];
  status?: string;
}

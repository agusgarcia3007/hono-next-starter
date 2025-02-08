import { SelectUser } from "@/db/schema";

export type UserResponse = Omit<SelectUser, "password">;

export interface SignupResponse {
  user: UserResponse;
  token: string;
}

export interface LoginResponse {
  user: UserResponse;
  token: string;
}

export interface ErrorResponse {
  message: string;
}

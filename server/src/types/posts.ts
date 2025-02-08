import { SelectPost } from "@/db/schema";

export type PostsResponse = PaginatedResponse<SelectPost>;

export interface PostResponse {
  post: SelectPost;
}

export interface ErrorResponse {
  message: string;
}

export interface DeletePostResponse {
  message: string;
}

export interface SelectPostWithAuthor extends SelectPost {
  author: { id: number; name: string; email: string } | null;
}

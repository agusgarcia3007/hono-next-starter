import { PostsService } from "@/services/posts";
import { type Post } from "@/types/posts";
import { useQuery } from "@tanstack/react-query";

interface UsePostsQueryParams {
  page?: number;
  limit?: number;
}

export const usePostsQuery = ({ page = 1, limit = 10 }: UsePostsQueryParams = {}) => {
  return useQuery<PaginatedResponse<Post>>({
    queryKey: ["posts", { page, limit }],
    queryFn: () => PostsService.getPosts({ page, limit }),
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostsService } from ".";

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostsService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
    },
  });
};

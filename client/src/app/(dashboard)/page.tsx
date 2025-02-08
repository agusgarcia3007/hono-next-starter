import { CreatePostButton } from "@/components/posts/create-post-button";
import { PostsList } from "@/components/posts/posts-list";
import { PostsService } from "@/services/posts";
import { QueryClient } from "@tanstack/react-query";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () => PostsService.getPosts(),
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center px-2 justify-between">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <CreatePostButton />
      </div>

      <PostsList />
    </div>
  );
}

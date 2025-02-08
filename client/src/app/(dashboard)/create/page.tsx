import { PostForm } from "@/components/posts/post-form";

export default function CreatePostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Post</h1>
        <p className="text-muted-foreground">
          Create a new post to share with the community
        </p>
      </div>

      <PostForm />
    </div>
  );
}

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/format-date";
import { Post } from "@/types/posts";
import Link from "next/link";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link key={post.id} href={`/posts/${post.id}`}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          {post.author && (
            <p className="text-sm text-muted-foreground">
              by {post.author.name}
            </p>
          )}
        </CardHeader>
        <CardContent className="pb-4">
          <p className="line-clamp-3 text-muted-foreground">{post.content}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <p className="text-sm text-muted-foreground">
            Created at {formatDate(post.createdAt)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

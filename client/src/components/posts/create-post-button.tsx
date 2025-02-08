"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";

export function CreatePostButton() {
  const { isAuthenticated } = useAuth();
  return (
    <Link
      onClick={() => {
        if (!isAuthenticated) {
          localStorage.setItem("lastPath", "/create");
          return "/login";
        }
      }}
      href={isAuthenticated ? "/create" : "/login"}
    >
      <Button>Create Post</Button>
    </Link>
  );
}

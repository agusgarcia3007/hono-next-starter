"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePostsQuery } from "@/services/posts/query";
import { PostCard } from "./post-card";
import { PostsSkeleton } from "./skeleton";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const pageSizes = [9, 12, 15, 18] as const;

export function PostsList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof pageSizes)[number]>(9);

  const { data, isLoading } = usePostsQuery({
    page,
    limit: pageSize,
  });

  if (isLoading) {
    return <PostsSkeleton />;
  }

  if (data?.data?.length === 0 || !data) {
    return (
      <Card>
        <CardContent className="flex min-h-[400px] items-center justify-center text-muted-foreground">
          No posts yet.
        </CardContent>
      </Card>
    );
  }

  const totalPages = data.pagination.pages;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showEllipsisStart = page > 3;
  const showEllipsisEnd = page < totalPages - 2;

  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;

    if (page <= 3) return pages.slice(0, 5);
    if (page >= totalPages - 2) return pages.slice(-5);

    return pages.slice(page - 2, page + 1);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col">
      <div className="flex-1">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <div className="py-6 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Items per page
            </span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value) as typeof pageSize);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizes.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>

            {showEllipsisStart && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(1);
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {getVisiblePages().map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  isActive={pageNum === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(pageNum);
                  }}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            {showEllipsisEnd && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(totalPages);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

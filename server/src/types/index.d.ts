interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface ApiResponse<T> {
  count: number;
  limit: number;
  offset: number;
  total: number;
  results: T
  deletedIds: number[];
}

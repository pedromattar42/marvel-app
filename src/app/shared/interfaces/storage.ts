export interface StorageInterface<T> {
  count: number;
  limit: number;
  offset: number;
  total: number;
  results: T;
}

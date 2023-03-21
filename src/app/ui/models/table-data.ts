export interface TableData<T> {
  data: T[] | undefined;
  page: number;
  size: number;
  total: number;
}

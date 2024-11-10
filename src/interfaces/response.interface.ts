export interface IResponse<T> {
  count: number;
  page: number;
  limit: number;
  totalPage: number;
  data: T;
}

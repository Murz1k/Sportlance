export interface CollectionResponse<T> {
  items: Array<T>;
  offset: number;
  totalCount: number;
  count: number;
}

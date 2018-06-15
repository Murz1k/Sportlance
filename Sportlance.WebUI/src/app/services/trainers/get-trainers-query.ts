export interface GetTrainersQuery {
  minPrice?: number;
  maxPrice?: number;
  searchString?: string;
  trainingsMinCount?: number;
  trainingsMaxCount?: number;
  feedbacksMinCount?: number;
  feedbacksMaxCount?: number;
  offset?: number;
  count?: number;
}

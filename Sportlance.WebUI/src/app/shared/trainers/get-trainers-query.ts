export interface GetTrainersQuery {
  minPrice?: number;
  maxPrice?: number;
  searchString?: string;
  country?: string;
  city?: string;
  trainingsMinCount?: number;
  trainingsMaxCount?: number;
  feedbacksMinCount?: number;
  feedbacksMaxCount?: number;
  offset?: number;
  count?: number;
  teamId?: number;
}

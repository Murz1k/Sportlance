export interface GetTeamQuery {
  userId?: number;
  offset?: number;
  count?: number;
  searchString?: string;
  country?: string;
  city?: string;
}

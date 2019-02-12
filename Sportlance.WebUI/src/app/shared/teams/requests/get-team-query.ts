export interface GetTeamQuery {
  offset?: number;
  count?: number;
  searchString?: string;
  country?: string;
  city?: string;

  leftUpperCornerLongitude?: number;
  leftUpperCornerLatitude?: number;
  rightLowerCornerLongitude?: number;
  rightLowerCornerLatitude?: number;
}

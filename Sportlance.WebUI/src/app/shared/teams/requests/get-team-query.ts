export interface GetTeamQuery {
  offset?: number;
  count?: number;
  search?: string;
  country?: string;
  city?: string;

  leftUpperCornerLongitude?: number;
  leftUpperCornerLatitude?: number;
  rightLowerCornerLongitude?: number;
  rightLowerCornerLatitude?: number;
}

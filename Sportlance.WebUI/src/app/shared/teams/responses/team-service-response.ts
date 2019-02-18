export interface TeamServiceResponse {
  id: number;
  authorId: number;
  teamId?: number
  name: string;
  description: string;
  duration: string;
  price: string;
}

export interface TeamResponse {
  id: number;
  authorId: number;
  country: string;
  city: string;
  title: string;
  subTitle: string;
  about: string;
  photoUrl: string;
  backgroundUrl: string;
  phoneNumber: string;
  address: string;
  geo: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

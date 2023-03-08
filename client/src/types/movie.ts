export type Rating = {
  username: string;
  rating: number;
};

export type Movie = {
  _id?: string;
  title: string;
  desc: string;
  quote: string;
  imgBig: string;
  imgSmall: string;
  trailer: string;
  year: string;
  limits: number;
  genres: string[];
  duration: string;
  actors: string[];
  director: string;
  ratings: Rating[] | [];
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

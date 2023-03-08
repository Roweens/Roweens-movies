import { Movie } from './movie';

export type User = {
  _id: string;
  accessToken: string;
  username: string;
  email: string;
  profilePic?: string;
  isAdmin: boolean;
  gender?: string;
  birth?: Date;
  watchlist?: Movie[];
  watching?: [];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

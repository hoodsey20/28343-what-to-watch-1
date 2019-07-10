import { string } from "prop-types";

export interface Movie {
  id: number;
  name: string;
  released: number;
  genre: string;
  backgroundImage: string;
  posterImage: string;
  isFavorite: boolean;
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
}

export interface Review {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}

interface MatchParams {
  id: number;
}

export interface Match {
  [params: string]: MatchParams;
}

export interface FormFieldData {
  [key: string]: string;
}

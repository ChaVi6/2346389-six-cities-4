import { User } from './reviews';

export type Location = {
  width: number;
  length: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: number;
  title: string;
  description: string;
  type: string;
  price: number;
  bedrooms: number;
  maxAdults: number;
  inside: string[];
  host: User;
  city: City;
  location: Location;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  images: string[];
  rating: number;
};

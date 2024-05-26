import { Offer } from './offers';

export type initialStateType = {
    cityName: string | null;
    offers: Offer[];
    offerFilter: Offer[];
    isOffersDataLoading: boolean;
  }

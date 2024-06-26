import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OffersData } from '../../types/state';
import { NameSpace, CityName } from '../../components/const/const';
import { fetchOffersAction, setOfferFavoriteStatusAction } from '../api-actions';

const initialState: OffersData = {
  isOffersDataLoading: false,
  offers: [],
  filteredOffers: [],
  cityName: CityName.PARIS,
};

export const offersData = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    offerFilter: (state) => {
      state.filteredOffers = state.offers.filter((offer)=> offer.city.name === state.cityName);
    },
    cityPick: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
        state.filteredOffers = state.offers.filter((offer)=> offer.city.name === state.cityName);
      })
      .addCase(setOfferFavoriteStatusAction.fulfilled, (state, action) => {
        const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
        state.offers = [
          ...state.offers.slice(0, index),
          action.payload,
          ...state.offers.slice(index + 1),
        ];
        state.filteredOffers = state.offers.filter((offer)=> offer.city.name === state.cityName);
      });
  }
});

export const {offerFilter, cityPick} = offersData.actions;

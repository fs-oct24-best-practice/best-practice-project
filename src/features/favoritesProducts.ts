import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

type favoritesProductsState = {
  favoritesProducts: Product[];
};

const initialState: favoritesProductsState = {
  favoritesProducts: [],
};

const favoritesProductsSlice = createSlice({
  name: 'favoritesProducts',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      state.favoritesProducts.push(action.payload);
    },
    remove: (state, action: PayloadAction<Product>) => {
      state.favoritesProducts = state.favoritesProducts.filter(
        (favourite) => favourite.id !== action.payload.id
      );
    },
  },
});

export default favoritesProductsSlice.reducer;
export const { actions } = favoritesProductsSlice;

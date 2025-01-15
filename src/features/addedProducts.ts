import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

type addedProductsState = {
  addedProducts: Product[];
};

const initialState: addedProductsState = {
  addedProducts: [],
};

const addedProductsSlice = createSlice({
  name: 'addedProducts',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      state.addedProducts.push(action.payload);
    },
    remove: (state, action: PayloadAction<Product>) => {
      state.addedProducts = state.addedProducts.filter(
        (favourite) => favourite.id !== action.payload.id
      );
    },
  },
});

export default addedProductsSlice.reducer;
export const { actions } = addedProductsSlice;

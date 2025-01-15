import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Product } from '../types';

type CartState = {
  items: Product[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantity(state, action: PayloadAction<Product>) {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity(state, action: PayloadAction<Product>) {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    deleteCart(state, action: PayloadAction<Product>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

const persistConfig = {
  key: 'cart',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

export const { increaseQuantity, decreaseQuantity, deleteCart, clearCart } =
  cartSlice.actions;
export default persistedCartReducer;

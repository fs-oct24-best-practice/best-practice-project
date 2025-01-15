import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

type CartState = {
  cartProducts: Product[];
};

const initialState: CartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantity(state, action: PayloadAction<Product>) {
      const item = state.cartProducts.find(
        (item) => item.id === action.payload.id
      );

      if (item) {
        item.quantity += 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity(state, action: PayloadAction<Product>) {
      const item = state.cartProducts.find(
        (item) => item.id === action.payload.id
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    deleteCart(state, action: PayloadAction<Product>) {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearCart(state) {
      state.cartProducts = [];
    },
  },
});

export const { increaseQuantity, decreaseQuantity, deleteCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

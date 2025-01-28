import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductInCart } from '../types/ProductInCart';

type CartState = {
  cartProducts: ProductInCart[];
};

const initialState: CartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantity(state, action: PayloadAction<ProductInCart>) {
      const item = state.cartProducts.find(
        (item) => item.id === action.payload.id
      );

      if (item) {
        item.quantity += 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity(state, action: PayloadAction<ProductInCart>) {
      const item = state.cartProducts.find(
        (item) => item.id === action.payload.id
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    deleteCart(state, action: PayloadAction<ProductInCart>) {
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

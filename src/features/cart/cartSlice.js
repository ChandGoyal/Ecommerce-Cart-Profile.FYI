import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
  discount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += action.payload.price;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
      state.totalQuantity += 1;
      state.totalAmount += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalAmount +=
          (quantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
      }
    },
    applyCoupon: (state, action) => {
      const { coupon } = action.payload;
      if (coupon === "15OFF") {
        state.discount = 0.15;
      } else if (coupon === "25OFF") {
        state.discount = 0.25;
      } else {
        state.discount = 0;
        toast.error("Invalid Coupon Code!");
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.discount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

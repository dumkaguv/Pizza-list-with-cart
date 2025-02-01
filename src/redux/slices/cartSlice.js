import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((existingItem) =>
        Object.keys(item).every((key) => existingItem[key] === item[key])
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.totalQuantity++;
      state.totalPrice += item.price;
      //console.log(JSON.stringify(state.items));
    },
    removeItem(state, action) {
      state.items.splice(
        state.items.indexOf((item) =>
          Object.keys(action.payload).every(
            (key) => item[key] === action.payload[key]
          )
        ),
        1
      );
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

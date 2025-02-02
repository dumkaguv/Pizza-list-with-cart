import { createSlice } from "@reduxjs/toolkit";

const findItem = (items, item) => {
  const index = items.findIndex((existingItem) =>
    Object.keys(item).every((key) => existingItem[key] === item[key])
  );

  if (index !== -1) {
    return { index, item: items[index] };
  } else {
    return { index: -1, item: null };
  }
};

export const selectIsInCart = (state, item) => {
  return !!findItem(state.cart.items, item).item;
};

export const selectCartItemQuantity = (state, item) => {
  const { item: existingItem } = findItem(state.cart.items, item);

  return existingItem ? existingItem.quantity : 0;
};

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
      const { item: existingItem } = findItem(state.items, item);

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
      const item = action.payload;
      const { index, item: existingItem } = findItem(state.items, item);

      state.totalPrice -= existingItem.price * existingItem.quantity;
      state.totalQuantity -= existingItem.quantity;
      state.items.splice(index, 1);
    },
    handleItemQuantity(state, action) {
      const item = action.payload.item;
      const { item: existingItem, index } = findItem(state.items, item);

      if (existingItem) {
        existingItem.quantity += action.payload.quantityChange;
        state.totalPrice += existingItem.price * action.payload.quantityChange;
        state.totalQuantity += action.payload.quantityChange;

        if (existingItem.quantity <= 0) {
          state.items.splice(index, 1);
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  handleItemQuantity,
  checkIsInCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

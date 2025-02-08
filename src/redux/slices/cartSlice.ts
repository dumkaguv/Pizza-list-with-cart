import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  quantity?: number;
};

interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const findItem = (items: CartItem[], item: CartItem) => {
  const index = items.findIndex((existingItem) =>
    (Object.keys(item) as (keyof CartItem)[]).every(
      (key) => existingItem[key] === item[key]
    )
  );

  return index !== -1 ? { index, item: items[index] } : { index: -1, item: null };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const { item: existingItem } = findItem(state.items, item);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity ?? 0) + 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.totalQuantity++;

      if (item.price) {
        state.totalPrice += item.price;
      }
      //console.log(JSON.stringify(state.items));
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const { index, item: existingItem } = findItem(state.items, item);

      if (existingItem) {
        if (existingItem.price && existingItem.quantity) {
          state.totalPrice -= existingItem.price * existingItem.quantity;
        }

        state.totalQuantity = state.totalQuantity - (existingItem.quantity ?? 0);
        state.items.splice(index, 1);
      }
    },
    handleItemQuantity(
      state,
      action: PayloadAction<{ item: CartItem; quantityChange: number }>
    ) {
      const item = action.payload.item;
      const { item: existingItem, index } = findItem(state.items, item);

      if (existingItem) {
        if (existingItem.price) {
          state.totalPrice += existingItem.price * action.payload.quantityChange;
        }

        existingItem.quantity =
          action.payload.quantityChange + (existingItem.quantity ?? 0);
        state.totalQuantity += action.payload.quantityChange;

        if (existingItem.quantity && existingItem.quantity <= 0) {
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

export const selectIsInCart = (state: RootState, item: CartItem) => {
  return !!findItem(state.cart.items, item).item;
};

export const selectCartItemQuantity = (state: RootState, item: CartItem) => {
  const { item: existingItem } = findItem(state.cart.items, item);

  return existingItem ? existingItem.quantity : 0;
};

export const { addItem, removeItem, handleItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./slices/filterSlice";
import paginationReducer from "./slices/paginationSlice";
import searchReducer from "./slices/searchSlice";
import cartReducer from "./slices/cartSlice";
import pizzaReducer from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    pagination: paginationReducer,
    search: searchReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, UseDispatch } from "react-redux";

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppdispatch = () => useDispatch<AppDispatch>();

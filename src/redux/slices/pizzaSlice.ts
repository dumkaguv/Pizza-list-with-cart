import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import STATUSES from "@/constants/fetchStatuses";

const BASE_URL =
  "https://pizza-list-with-cart-api.vercel.app/api/pizzas";

export type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  prices: Record<string, string>;
  category: number;
  rating: number;
  ingredients: string[];
};

interface PizzaSliceState {
  data: Pizza[];
  status: STATUSES;
}

const initialState: PizzaSliceState = {
  data: [],
  status: STATUSES.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Pizza[]>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = STATUSES.LOADING;
        state.data = [];
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = STATUSES.ERROR;
        state.data = [];
      });
  },
});

export const fetchData = createAsyncThunk<Pizza[], string>(
  "pizza/fetchData",
  async (url = BASE_URL) => {
    const { data } = await axios.get<Pizza[]>(url);

    return data;
  }
);

export const { setData } = pizzaSlice.actions;

export default pizzaSlice.reducer;

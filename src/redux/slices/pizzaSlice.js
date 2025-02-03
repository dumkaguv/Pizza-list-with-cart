import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import STATUSES from "@/constants/fetchStatuses";

const BASE_URL = "http://localhost:3000/api/pizzas";

export const fetchData = createAsyncThunk(
  "pizza/fetchData",
  async (url = BASE_URL) => {
    const { data } = await axios.get(url);

    return data;
  }
);

const initialState = {
  data: [],
  status: STATUSES.loading,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = STATUSES.loading;
        state.data = [];
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.success;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = STATUSES.error;
        state.data = [];
      });
  },
});

export const { setData } = pizzaSlice.actions;

export default pizzaSlice.reducer;

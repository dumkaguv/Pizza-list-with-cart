import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterSliceState {
  categoryId: number;
  sortId: number;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sortId: 0,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortId(state, action: PayloadAction<number>) {
      state.sortId = action.payload;
    },
  },
});

export const { setCategoryId, setSortId } = filterSlice.actions;

export default filterSlice.reducer;

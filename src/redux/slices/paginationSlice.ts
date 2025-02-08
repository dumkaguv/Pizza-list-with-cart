import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationSliceState {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: PaginationSliceState = {
  totalPages: 1,
  currentPage: 1,
  itemsPerPage: 8,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setTotalPages, setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;

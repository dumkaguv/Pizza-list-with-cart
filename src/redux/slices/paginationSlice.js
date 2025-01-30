import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPages: 1,
  currentPage: 1,
  itemsPerPage: 8,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setTotalPages, setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;

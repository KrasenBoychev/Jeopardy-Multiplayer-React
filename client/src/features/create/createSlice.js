import { createSlice } from "@reduxjs/toolkit";

const createItemsSlice = createSlice({
  name: "createItems",
  initialState: {
    categoryName: "",
    questionOne: null,
    questionTwo: null,
    questionThree: null,
    questionFour: null,
    currentPage: 0,
  },
  reducers: {
    setCategoryName: (state, action) => {
      const name = action.payload;
      state.categoryName = name;
    },
    goToNextPage: (state, action) => {
      state.currentPage = state.currentPage + 1;
    },
    goToPreviousPage: (state, action) => {
      state.currentPage = state.currentPage - 1;
    },
    deleteItems: (state, action) => {
      // TODO
    },
  },
});

export const { setCategoryName, goToNextPage, goToPreviousPage, deleteItems } =
  createItemsSlice.actions;

export default createItemsSlice.reducer;

export const selectCreateItemsAllValues = (state) => state.createItems;
export const selectCategoryName = (state) => state.createItems.categoryName;
export const selectCurrentPage = (state) => state.createItems.currentPage;

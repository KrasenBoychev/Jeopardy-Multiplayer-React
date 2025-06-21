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
      state.categoryName = action.payload;
    },
    setQuestionDetails: (state, action) => {
      const { questionNumber, questionDetails } = action.payload;
      state[`${questionNumber}`] = questionDetails;
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

export const {
  setCategoryName,
  setQuestionDetails,
  goToNextPage,
  goToPreviousPage,
  deleteItems,
} = createItemsSlice.actions;

export default createItemsSlice.reducer;

export const selectCreateItemsAllValues = (state) => state.createItems;
export const selectCategoryName = (state) => state.createItems.categoryName;
export const selectCurrentPage = (state) => state.createItems.currentPage;

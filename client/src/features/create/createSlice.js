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
    responseMsg: { status: null, msg: "" },
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
    setResponseMsg: (state, action) => {
      state.responseMsg = action.payload;
    },
    deleteItems: (state, action) => {
      state.categoryName = "";
      state.questionOne = null;
      state.questionTwo = null;
      state.questionThree = null;
      state.questionFour = null;
      state.currentPage = 0;
      state.responseMsg = { status: null, msg: "" };
    },
  },
});

export const {
  setCategoryName,
  setQuestionDetails,
  goToNextPage,
  goToPreviousPage,
  setResponseMsg,
  deleteItems,
} = createItemsSlice.actions;

export default createItemsSlice.reducer;

export const selectCreateItemsAllValues = (state) => state.createItems;
export const selectCategoryName = (state) => state.createItems.categoryName;
export const selectCurrentPage = (state) => state.createItems.currentPage;
export const selectResponseMsg = (state) => state.createItems.responseMsg;

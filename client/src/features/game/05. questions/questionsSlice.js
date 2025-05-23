import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: { questions: null, isQuestionChosen: false },
  reducers: {
    setQuestions: (state, action) => {
      const questions = action.payload;
      state.questions = questions;
    },
    updateIsQuestionChosen: (state, action) => {
      state.isQuestionChosen = !state.isQuestionChosen;
    },
    deleteQuestions: (state, action) => {
      state.questions = null;
      state.isQuestionChosen = false;
    },
  },
});

export const { setQuestions, updateIsQuestionChosen, deleteQuestions } =
  questionsSlice.actions;

export default questionsSlice.reducer;

export const selectQuestions = (state) => state.questions.questions;
export const selectIsQuestionChosen = (state) =>
  state.questions.isQuestionChosen;

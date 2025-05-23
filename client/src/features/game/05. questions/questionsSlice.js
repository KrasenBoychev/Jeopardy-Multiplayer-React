import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: null,
    questionChosen: null,
  },
  reducers: {
    setQuestions: (state, action) => {
      const questions = action.payload;
      state.questions = questions;
    },
    updateQuestionChosen: (state, action) => {
      const question = action.payload;
      state.questionChosen = question;
    },
    deleteQuestions: (state, action) => {
      state.questions = null;
      state.questionChosen = null;
    },
  },
});

export const { setQuestions, updateQuestionChosen, deleteQuestions } =
  questionsSlice.actions;

export default questionsSlice.reducer;

export const selectQuestions = (state) => state.questions.questions;
export const selectQuestionChosen = (state) => state.questions.questionChosen;

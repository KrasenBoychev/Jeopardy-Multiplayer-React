import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: { questions: null },
  reducers: {
    setQuestions: (state, action) => {
      const newQuestions = action.payload;
      state.questions = newQuestions;
    },
    deleteQuestions: (state, action) => {
      state.questions = null;
    },
  },
});

export const { setQuestions, deleteQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;

export const selectQuestions = (state) => state.questions.questions;

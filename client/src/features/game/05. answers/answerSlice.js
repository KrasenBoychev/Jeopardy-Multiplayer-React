import { createSlice } from "@reduxjs/toolkit";

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    answerChosen: null,
    isAnswerCorrect: null,
  },
  reducers: {
    setAnswerChosen: (state, action) => {
      const answer = action.payload;
      state.answerChosen = answer;
    },
    updateIsAnswerCorrect: (state, action) => {
      const value = action.payload;
      state.isAnswerCorrect = value;
    },
    deleteAnswerDetails: (state, action) => {
      state.answerChosen = null;
      state.isAnswerCorrect = null;
    },
  },
});

export const { setAnswerChosen, updateIsAnswerCorrect, deleteAnswerDetails } =
  answerSlice.actions;

export default answerSlice.reducer;

export const selectAnswerChosen = (state) => state.answer.answerChosen;
export const selectIsAnswerCorrect = (state) => state.answer.isAnswerCorrect;

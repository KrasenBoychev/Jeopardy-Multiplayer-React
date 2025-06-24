import { gamePoints } from "./validateValues";

export const singleQuestionInitialValues = () => {
  return {
    categoryName: "",
    points: "",
    questionName: "",
    answerOne: "",
    answerTwo: "",
    answerThree: "",
    answerFour: "",
    correctAnswer: "",
  };
};

export const multipleQuestionsInitialValues = (
  createItemsAllValues,
  currentPage,
  categoryName
) => {
  const questionValues = Object.values(createItemsAllValues)[currentPage];

  return {
    categoryName,
    points: questionValues
      ? questionValues.points
      : gamePoints[currentPage - 1],
    questionName: questionValues ? questionValues.questionName : "",
    answerOne: questionValues ? questionValues.answerOne : "",
    answerTwo: questionValues ? questionValues.answerTwo : "",
    answerThree: questionValues ? questionValues.answerThree : "",
    answerFour: questionValues ? questionValues.answerFour : "",
    correctAnswer: questionValues ? questionValues.correctAnswer : "",
  };
};

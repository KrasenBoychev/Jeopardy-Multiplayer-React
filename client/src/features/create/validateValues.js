export const gamePoints = ["5", "10", "15", "20"];
export const correctAnswerValues = [
  "Answer 1",
  "Answer 2",
  "Answer 3",
  "Answer 4",
];

const checkCategoryField = (category, allCategoriesNames) => {
  if (!allCategoriesNames.includes(category)) {
    return true;
  } else {
    return false;
  }
};

const checkPointsField = (points) => {
  if (!gamePoints.includes(points)) {
    return true;
  } else {
    return false;
  }
};

const checkQuestionOrAnswerField = (element) => {
  if (element.trim() == "") {
    return true;
  } else {
    return false;
  }
};

const checkCorrectAnswerField = (correctAnswer) => {
  if (!correctAnswerValues.includes(correctAnswer)) {
    return true;
  } else {
    return false;
  }
};

export const setNewFormValues = (
  setFormValues,
  elementChanged,
  newContent,
  allCategoriesNames
) => {
  setFormValues((prev) => {
    let newValues = Object.assign({}, prev);
    newValues[`${elementChanged}`].content = newContent;

    let isError;

    switch (elementChanged) {
      case "category":
        isError = checkCategoryField(newContent, allCategoriesNames);
        break;
      case "points":
        isError = checkPointsField(newContent);
        break;
      case "question":
        isError = checkQuestionOrAnswerField(newContent);
        break;
      case "answerOne":
        isError = checkQuestionOrAnswerField(newContent);
        break;
      case "answerTwo":
        isError = checkQuestionOrAnswerField(newContent);
        break;
      case "answerThree":
        isError = checkQuestionOrAnswerField(newContent);
        break;
      case "answerFour":
        isError = checkQuestionOrAnswerField(newContent);
        break;
      case "correctAnswer":
        isError = checkCorrectAnswerField(newContent);
        break;
    }

    if (isError) {
      newValues[`${elementChanged}`].error = true;
    } else {
      newValues[`${elementChanged}`].error = false;
    }

    return newValues;
  });
};

export function validateAllValues(
  formValues,
  setFormValues,
  allCategoriesNames
) {
  Object.keys(formValues).forEach((element) => {
    setNewFormValues(
      setFormValues,
      element,
      formValues[`${element}`].content,
      allCategoriesNames
    );
  });
}

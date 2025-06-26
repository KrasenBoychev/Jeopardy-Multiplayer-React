export const gamePoints = ["5", "10", "15", "20"];
export const correctAnswerValues = [
  { optionValue: "answerOne", text: "Answer 1" },
  { optionValue: "answerTwo", text: "Answer 2" },
  { optionValue: "answerThree", text: "Answer 3" },
  { optionValue: "answerFour", text: "Answer 4" },
];

export function validateAllValues(
  formValues,
  setFormValues,
  allCategoriesNames,
  categoryName,
  currentPage
) {
  const copyFormValues = Object.assign({}, formValues);

  Object.keys(formValues).forEach((element) => {
    setNewFormValues(
      copyFormValues,
      element,
      formValues[`${element}`].content,
      allCategoriesNames,
      categoryName,
      currentPage
    );
  });

  setFormValues(copyFormValues);

  let areFormValuesValid = true;

  Object.values(copyFormValues).forEach((element) => {
    if (element.error) {
      areFormValuesValid = false;
    }
  });

  return areFormValuesValid;
}

export const setNewFormValues = (
  copyFormValues,
  elementChanged,
  newContent,
  allCategoriesNames,
  categoryName,
  currentPage
) => {
  copyFormValues[`${elementChanged}`].content = newContent;

  let isError;

  switch (elementChanged) {
    case "category":
      isError = checkCategoryField(
        newContent,
        allCategoriesNames,
        categoryName,
        currentPage
      );
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

  copyFormValues[`${elementChanged}`].error = isError;

  return copyFormValues;
};

const checkCategoryField = (
  category,
  allCategoriesNames,
  categoryName,
  currentPage
) => {
  if (currentPage == 0) {
    if (!allCategoriesNames.includes(category)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (category !== categoryName) {
      return true;
    } else {
      return false;
    }
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
  const optionValues = correctAnswerValues.map((value) => value.optionValue);
  if (!optionValues.includes(correctAnswer)) {
    return true;
  } else {
    return false;
  }
};

export const checkQuestionNames = (
  questionName,
  createItemsAllValues,
  currentPage
) => {
  const questionsNames = Object.values(createItemsAllValues)
    .slice(1, currentPage)
    .map((question) => question.questionName);

  if (questionsNames.includes(questionName)) {
    return { result: true, error: `${questionName} already exists` };
  } else {
    return { result: false };
  }
};

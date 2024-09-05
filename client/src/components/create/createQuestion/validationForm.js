import toast from "react-hot-toast";
import { points } from "../../../common/gamePoints";

export function validateValues(values, errors, category, allCategories) {
  if (!category) {
    const categoryNames = allCategories.map((c) => c.name);

    if (
      !categoryNames.includes(values.category) ||
      values.category == "--- Choose Category ---"
    ) {
      errors.category = "Category should be chosen from the drop down list";
    }
  }

  if (
    !points.includes(values.points) ||
    values.points == "--- Choose Points ---"
  ) {
    errors.points = "Points should be chosen from the drop down list";
  }

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.answerOne) {
    errors.answerOne = "Answer One is required";
  }

  if (!values.answerTwo) {
    errors.answerTwo = "Answer Two is required";
  }

  if (!values.answerThree) {
    errors.answerThree = "Answer Three is required";
  }

  if (!values.answerFour) {
    errors.answerFour = "Answer Four is required";
  }
}

export function checkTrueAnswer(answersCorrectValues) {
  let isTrue = true;

  if (!answersCorrectValues.includes("true")) {
    isTrue = false;
    toast.error("Choose correct answer");
  } else {
    let repeatedTrueValues = 0;

    for (let i = 0; i < answersCorrectValues.length; i++) {
      if (answersCorrectValues[i] == "true") {
        repeatedTrueValues++;
      }
    }

    if (repeatedTrueValues > 1) {
      isTrue = false;
      toast.error("Choose ONLY ONE correct answer");
    }
  }

  return isTrue;
}

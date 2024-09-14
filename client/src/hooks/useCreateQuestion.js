import { useEffect, useState } from "react";

import { getAllCategories } from "../../api/game-api";

export default function useCreateQuestion(category, question) {
  const answersValues = ["false", "false", "false", "false"];

  if (question && [0, 1, 2, 3].includes(question.correctIndex)) {
    answersValues[question.correctIndex] = 'true';
  }

  const [answersCorrectValues, setAnswersCorrectValues] = useState(answersValues);

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    (async function getCategories() {
      if (!category) {
        const categories = await getAllCategories();
        setAllCategories(categories);
      }

      if (question && question.answers) {
        let copyValues = [...answersCorrectValues];
        copyValues[question.answers.correctAnswer] = "true";

        setAnswersCorrectValues(copyValues);
      }
    })();
  }, []);

  return [answersCorrectValues, setAnswersCorrectValues, allCategories];
}

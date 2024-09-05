import { useEffect, useState } from "react";

import { getAllCategories } from "../../api/game-api";

export default function useCreateQuestion(category, question) {
    const [answersCorrectValues, setAnswersCorrectValues] = useState([
        "false",
        "false",
        "false",
        "false",
      ]);
    
      const [allCategories, setAllCategories] = useState([]);
    
      useEffect(() => {
        (async function getCategories() {
          if (!category) {
            const categories = await getAllCategories();
            setAllCategories(categories);
          }

          if (question && question.answers) {
            let copyValues = [...answersCorrectValues];
            copyValues[question.answers.correctAnswer] = 'true';
            
            setAnswersCorrectValues(copyValues);
          }
        })();
      }, []);
    
      return [answersCorrectValues, setAnswersCorrectValues, allCategories];
}
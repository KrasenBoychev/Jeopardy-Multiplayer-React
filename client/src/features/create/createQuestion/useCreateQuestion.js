import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  selectCategoryName,
  selectCreateItemsAllValues,
  selectCurrentPage,
} from "../createSlice";
import { useGetCategoriesMutation } from "../../game/gameApiSlice";
import { multipleQuestionsInitialValues } from "./initialValues";

export function useCreateQuestion() {
  const [formValues, setFormValues] = useState({
    category: { content: "", error: false },
    points: { content: "", error: false },
    question: { content: "", error: false },
    answerOne: { content: "", error: false },
    answerTwo: { content: "", error: false },
    answerThree: { content: "", error: false },
    answerFour: { content: "", error: false },
    correctAnswer: {
      content: "",
      error: false,
    },
  });
  const [allCategoriesNames, setAllCategoriesNames] = useState([]);
  const currentPage = useSelector(selectCurrentPage);
  const [getCategories] = useGetCategoriesMutation();
  const createItemsAllValues = useSelector(selectCreateItemsAllValues);
  const categoryName = useSelector(selectCategoryName);

  useEffect(() => {
    if (currentPage == 0) {
      (async () => {
        try {
          const getAllCategories = await getCategories();
          const categoryNamesOnly = getAllCategories.data.map(
            (category) => category.name
          );
          setAllCategoriesNames(categoryNamesOnly);
        } catch (err) {
          toast.error(err.message);
        }
      })();
    } else if (currentPage > 0 && currentPage <= 4) {
      const formInitialValues = multipleQuestionsInitialValues(
        createItemsAllValues,
        currentPage,
        categoryName
      );

      setFormValues({
        category: { content: formInitialValues.categoryName, error: false },
        points: { content: formInitialValues.points, error: false },
        question: { content: formInitialValues.questionName, error: false },
        answerOne: { content: formInitialValues.answerOne, error: false },
        answerTwo: { content: formInitialValues.answerTwo, error: false },
        answerThree: { content: formInitialValues.answerThree, error: false },
        answerFour: { content: formInitialValues.answerFour, error: false },
        correctAnswer: {
          content: formInitialValues.correctAnswer,
          error: false,
        },
      });
    }
  }, [currentPage]);

  return [allCategoriesNames, formValues, setFormValues];
}

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCategoryName,
  selectCreateItemsAllValues,
  selectCurrentPage,
} from "../createSlice";
import { useGetCategoriesMutation } from "../../game/gameApiSlice";
import { gamePoints } from "./validateValues";

export default function useCreateQuestion() {
  const [allCategoriesNames, setAllCategoriesNames] = useState([]);
  const [formValues, setFormValues] = useState({
    category: { content: "", error: false },
    points: { content: "", error: false },
    question: { content: "", error: false },
    answerOne: { content: "", error: false },
    answerTwo: { content: "", error: false },
    answerThree: { content: "", error: false },
    answerFour: { content: "", error: false },
    correctAnswer: { content: "", error: false },
  });
  const categoryName = useSelector(selectCategoryName);
  const currentPage = useSelector(selectCurrentPage);
  const createItemsAllValues = useSelector(selectCreateItemsAllValues);
  const [getCategories] = useGetCategoriesMutation();

  // let formInitialValues;

  // if (currentPage == 0) {
  //   formInitialValues = {
  //     categoryName: null,
  //     points: null,
  //     questionName: "",
  //     answerOne: "",
  //     answerTwo: "",
  //     answerThree: "",
  //     answerFour: "",
  //     correctAnswer: null,
  //   };
  // } else if (currentPage > 0 && currentPage <= 4) {
  //   const questionValues = Object.values(createItemsAllValues)[currentPage];

  //   formInitialValues = {
  //     categoryName,
  //     points: questionValues
  //       ? questionValues.points
  //       : gamePoints[currentPage - 1],
  //     questionName: questionValues ? questionValues.questionName : "",
  //     answerOne: questionValues ? questionValues.answerOne : "",
  //     answerTwo: questionValues ? questionValues.answerTwo : "",
  //     answerThree: questionValues ? questionValues.answerThree : "",
  //     answerFour: questionValues ? questionValues.answerFour : "",
  //     correctAnswer: questionValues ? questionValues.correctAnswer : "",
  //   };
  // }

  // const [formValues, setFormValues] = useState({
  //   category: { content: formInitialValues.categoryName, error: false },
  //   points: { content: formInitialValues.points, error: false },
  //   question: { content: formInitialValues.questionName, error: false },
  //   answerOne: { content: formInitialValues.answerOne, error: false },
  //   answerTwo: { content: formInitialValues.answerTwo, error: false },
  //   answerThree: { content: formInitialValues.answerThree, error: false },
  //   answerFour: { content: formInitialValues.answerFour, error: false },
  //   correctAnswer: { content: formInitialValues.correctAnswer, error: false },
  // });

  useEffect(() => {
    let formInitialValues;

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

      formInitialValues = {
        categoryName: null,
        points: null,
        questionName: "",
        answerOne: "",
        answerTwo: "",
        answerThree: "",
        answerFour: "",
        correctAnswer: null,
      };
    } else if (currentPage > 0 && currentPage <= 4) {
      const questionValues = Object.values(createItemsAllValues)[currentPage];

      formInitialValues = {
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
    }

    setFormValues({
      category: { content: formInitialValues.categoryName, error: false },
      points: { content: formInitialValues.points, error: false },
      question: { content: formInitialValues.questionName, error: false },
      answerOne: { content: formInitialValues.answerOne, error: false },
      answerTwo: { content: formInitialValues.answerTwo, error: false },
      answerThree: { content: formInitialValues.answerThree, error: false },
      answerFour: { content: formInitialValues.answerFour, error: false },
      correctAnswer: { content: formInitialValues.correctAnswer, error: false },
    });
  }, [currentPage]);

  return [allCategoriesNames, formValues, setFormValues];
}


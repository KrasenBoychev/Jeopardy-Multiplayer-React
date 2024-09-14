import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createCategory, createQuestion } from "../../api/create-api";
import { getCategory } from "../../api/game-api";

import { points } from "../common/gamePoints";

export default function useCreateCategory() {
  const [moveToNextPage, setMoveToNextPage] = useState(0);
  const [recordCategoryAndQuestions, setRecordCategoryAndQuestions] =
    useState(false);

  const [category, setCategory] = useState("");

  const questionModel = {
    name: "",
    points: points[0],
    answers: {
      answerOne: "",
      answerTwo: "",
      answerThree: "",
      answerFour: "",
    },
  };

  const [questionOne, setQuestionOne] = useState(questionModel);

  const questionModelTwo = Object.assign({}, questionModel);
  questionModelTwo.points = points[1];
  const [questionTwo, setQuestionTwo] = useState(questionModelTwo);

  const questionModelThree = Object.assign({}, questionModel);
  questionModelThree.points = points[2];
  const [questionThree, setQuestionThree] = useState(questionModelThree);

  const questionModelFour = Object.assign({}, questionModel);
  questionModelFour.points = points[3];
  const [questionFour, setQuestionFour] = useState(questionModelFour);

  const navigate = useNavigate();

  useEffect(() => {
    (async function record() {
      if (recordCategoryAndQuestions) {
        try {
          await createCategory({ name: category });
        } catch (error) {
          toast.error(error.message);

          setMoveToNextPage((oldValue) => oldValue - 1);
          setRecordCategoryAndQuestions(false);
          return;
        }

        let createdCategoryId;

        try {
          const result = await getCategory(category);
          createdCategoryId = result[0]._id;
        } catch (error) {
          toast.error(error.message);
          setMoveToNextPage((oldValue) => oldValue - 1);
          setRecordCategoryAndQuestions(false);
          return;
        }

        try {
          if (createdCategoryId) {
            await createQuestion(questionOne, createdCategoryId);
            await createQuestion(questionTwo, createdCategoryId);
            await createQuestion(questionThree, createdCategoryId);
            await createQuestion(questionFour, createdCategoryId);
          }
        } catch (error) {
          toast.error(error.message);
          setMoveToNextPage((oldValue) => oldValue - 1);
          setRecordCategoryAndQuestions(false);
          return;
        }

        navigate("/");
      }
    })();
  }, [recordCategoryAndQuestions]);

  return [
    moveToNextPage,
    setMoveToNextPage,
    category,
    setCategory,
    questionOne,
    setQuestionOne,
    questionTwo,
    setQuestionTwo,
    questionThree,
    setQuestionThree,
    questionFour,
    setQuestionFour,
    recordCategoryAndQuestions,
    setRecordCategoryAndQuestions,
  ];
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


import { createCategory, createQuestion } from "../../api/create-api";
import { getCategory } from "../../api/game-api";

export default function useCreateCategory() {
  const [moveToNextPage, setMoveToNextPage] = useState(0);
  const [recordCategoryAndQuestions, setRecordCategoryAndQuestions] =
    useState(false);

  const [category, setCategory] = useState("");

  const questionModel = {
    name: '',
    points: '',
    answers: {
        answerOne: '',
        answerTwo: '',
        answerThree: '',
        answerFour: '',
    }
  }

  const [questionOne, setQuestionOne] = useState(questionModel);
  const [questionTwo, setQuestionTwo] = useState(questionModel);
  const [questionThree, setQuestionThree] = useState(questionModel);
  const [questionFour, setQuestionFour] = useState(questionModel);

  const navigate = useNavigate();

  useEffect(() => {
    (async function record() {
      if (recordCategoryAndQuestions) {
        try {
          await createCategory({ name: category });
        } catch (error) {
          toast.error(error.message);
          return;
        }

        let createdCategoryId;

        try {
          const result = await getCategory(category);
          createdCategoryId = result[0]._id;
        } catch (error) {
          toast.error(error.message);
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
    setRecordCategoryAndQuestions
  ];
}

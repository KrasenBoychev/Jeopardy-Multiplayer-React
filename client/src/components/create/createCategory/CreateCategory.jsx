import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import CreateQuestion from "../createQuestion/CreateQuestion";
import Category from "./Category";

export default function CreateCategory() {
  const [moveToNextPage, setMoveToNextPage] = useState(0);

  const [category, setCategory] = useState("");
  const [questionOne, setQuestionOne] = useState({});
  const [questionTwo, setQuestionTwo] = useState({});
  const [questionThree, setQuestionThree] = useState({});
  const [questionFour, setQuestionFour] = useState({});

  const recordCategoryAndQuestions = () => {

  }

  return (
    <>
      {moveToNextPage == 0 && (
        <Category props={{ category, setCategory, setMoveToNextPage }} />
      )}

      {moveToNextPage == 1 && (
        <CreateQuestion
          category={category}
          question={questionOne}
          setQuestion={setQuestionOne}
          move={setMoveToNextPage}
        />
      )}

      {moveToNextPage == 2 && (
        <CreateQuestion
          question={questionTwo}
          setQuestion={setQuestionTwo}
          move={setMoveToNextPage}
        />
      )}

      {moveToNextPage == 3 && (
        <CreateQuestion
          question={questionThree}
          setQuestion={setQuestionThree}
          move={setMoveToNextPage}
        />
      )}

      {moveToNextPage == 4 && (
        <CreateQuestion
          question={questionFour}
          setQuestion={setQuestionFour}
          move={setMoveToNextPage}
        />
      )}

      {moveToNextPage == 5 && recordCategoryAndQuestions}
    </>
  );
}

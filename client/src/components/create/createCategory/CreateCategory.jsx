import useCreateCategory from "../../../hooks/useCreateCategory";

import CreateQuestion from "../createQuestion/CreateQuestion";
import Category from "./Category";
import DotLoader from "react-spinners/DotLoader";

export default function CreateCategory() {
  const [
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
  ] = useCreateCategory();

  return (
    <>
      {moveToNextPage == 0 && (
        <Category props={{ category, setCategory, setMoveToNextPage }} />
      )}

      {moveToNextPage == 1 && (
        <CreateQuestion
          props={{
            category,
            question: questionOne,
            setQuestion: setQuestionOne,
            move: moveToNextPage,
            setMove: setMoveToNextPage,
          }}
        />
      )}

      {moveToNextPage == 2 && (
        <CreateQuestion
          props={{
            category,
            question: questionTwo,
            setQuestion: setQuestionTwo,
            move: moveToNextPage,
            setMove: setMoveToNextPage,
          }}
        />
      )}

      {moveToNextPage == 3 && (
        <CreateQuestion
          props={{
            category,
            question: questionThree,
            setQuestion: setQuestionThree,
            move: moveToNextPage,
            setMove: setMoveToNextPage,
          }}
        />
      )}

      {moveToNextPage == 4 && (
        <CreateQuestion
          props={{
            category,
            question: questionFour,
            setQuestion: setQuestionFour,
            move: moveToNextPage,
            setMove: setMoveToNextPage,
            setRecordCategoryAndQuestions,
          }}
        />
      )}

      {/* {recordCategoryAndQuestions && <DotLoader />} */}
    </>
  );
}

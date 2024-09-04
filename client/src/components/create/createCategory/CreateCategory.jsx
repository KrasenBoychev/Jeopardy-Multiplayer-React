import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { createCategory, createQuestion } from "../../../../api/create-api";
import { getCategory } from "../../../../api/game-api";

import CreateQuestion from "../createQuestion/CreateQuestion";
import Category from "./Category";

export default function CreateCategory() {
  const [moveToNextPage, setMoveToNextPage] = useState(0);
  const [recordCategoryAndQuestions, setRecordCategoryAndQuestions] =
    useState(false);

  const [category, setCategory] = useState("");
  const [questionOne, setQuestionOne] = useState({});
  const [questionTwo, setQuestionTwo] = useState({});
  const [questionThree, setQuestionThree] = useState({});
  const [questionFour, setQuestionFour] = useState({});

  useEffect(() => {
    (async function record() {
      if (recordCategoryAndQuestions) {
        try {
          await createCategory(category);
        } catch (error) {
          toast.error(error.message);
          return;
        }

        // let createdCategory;

        // try {
        //   createdCategory = await getCategory(category);
        // } catch (error) {
        //   toast.error(error.message);
        //   return;
        // }

        // try {
        //   if (createCategory) {
        //     await createQuestion(questionOne, createCategory.id);
        //   }
        // } catch (error) {
        //   toast.error(error.message);
        //   return;
        // }

        // try {
        //   if (createCategory) {
        //     await createQuestion(questionTwo, createCategory.id);
        //   }
        // } catch (error) {
        //   toast.error(error.message);
        //   return;
        // }

        // try {
        //   if (createCategory) {
        //     await createQuestion(questionThree, createCategory.id);
        //   }
        // } catch (error) {
        //   toast.error(error.message);
        //   return;
        // }

        // try {
        //   if (createCategory) {
        //     await createQuestion(questionFour, createCategory.id);
        //   }
        // } catch (error) {
        //   toast.error(error.message);
        //   return;
        // }
      }
    })();
  }, [recordCategoryAndQuestions]);

  return (
    <>
      {moveToNextPage == 0 && (
            <Category props={{ category, setCategory, setMoveToNextPage }} />
      )}

      {moveToNextPage == 1 && (
        <CreateQuestion
          props={{
            category,
            setQuestion: setQuestionOne,
            move: moveToNextPage,
            setMove: setMoveToNextPage,
            setRecordCategoryAndQuestions
          }}
        />
      )}

      {/* {moveToNextPage == 2 && (
        <CreateQuestion
          props={{
            category,
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
            setQuestion: setQuestionFour,
            move: moveToNextPage,
            // setMove: setMoveToNextPage,
            setRecordCategoryAndQuestions,
          }}
        />
      )} */}
    </>
  );
}

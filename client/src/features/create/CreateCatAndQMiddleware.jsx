import { useSelector } from "react-redux";
import {
  selectCategoryName,
  selectCreateItemsAllValues,
  selectCurrentPage,
} from "./createSlice";
import CreateCategory from "./CreateCategory";
import CreateQuestion from "./createQuestion/CreateQuestion";
import { useEffect, useState } from "react";
import { multipleQuestionsInitialValues } from "./createQuestion/initialValues";

export default function CreateCatAndQMiddleware() {
  const [formInitialValues, setFormInitialValues] = useState({});
  const [moveToNextQuestion, setMoveToNextQuestion] = useState(false);
  const currentPage = useSelector(selectCurrentPage);
  const createItemsAllValues = useSelector(selectCreateItemsAllValues);
  const categoryName = useSelector(selectCategoryName);

  useEffect(() => {
    if (currentPage > 0 && currentPage <= 4) {
      setFormInitialValues(
        multipleQuestionsInitialValues(
          createItemsAllValues,
          currentPage,
          categoryName
        )
      );

      setTimeout(() => {
        setMoveToNextQuestion(true);
      }, 500);
    } else if (currentPage == 5) {
      (async () => {
        try {
          const items = Object.entries(createItemsAllValues);
          await recordCategoryAndQuestions(items);
          toast.success("Category and its questions saved successfully!");
        } catch (err) {
          toast.error(
            "Category and its questions was not saved! Please try again."
          );
        }
        dispatch(deleteItems());
        navigate("/create");
      })();
    }
  }, [currentPage]);

  return (
    <>
      {currentPage == 0 && <CreateCategory />}
      {currentPage > 0 && currentPage <= 4 && moveToNextQuestion ? (
        <CreateQuestion
          formInitialValues={formInitialValues}
          setMoveToNextQuestion={setMoveToNextQuestion}
        />
      ) : (
        "Loading..." // DotLoader
      )}
      {currentPage == 5 && "Result Component with Dot Loader"}
      {/* import DotLoader from "react-spinners/DotLoader"; */}
      {(currentPage < 0 || currentPage > 5) &&
        "Error Component - delete redux values and navigate"}
    </>
  );
}

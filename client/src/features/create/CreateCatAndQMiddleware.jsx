import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { DotLoader } from "react-spinners";
import {
  deleteItems,
  selectCreateItemsAllValues,
  selectCurrentPage,
} from "./createSlice";
import { useRecordCategoryAndQuestionsMutation } from "./createApiSlice";
import CreateCategory from "./CreateCategory";
import CreateQuestion from "./createQuestion/CreateQuestion";

export default function CreateCatAndQMiddleware() {
  const [errorCurrPage, setErrorCurrPage] = useState(false);
  const currentPage = useSelector(selectCurrentPage);
  const createItemsAllValues = useSelector(selectCreateItemsAllValues);
  const [recordCategoryAndQuestions] = useRecordCategoryAndQuestionsMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorCurrPage) {
      toast.error("Something went wrong! Refresh the page and try again.");
      dispatch(deleteItems());
      navigate("/create");
    }

    if (currentPage == 5) {
      (async () => {
        try {
          const items = Object.entries(createItemsAllValues);
          const result = await recordCategoryAndQuestions(items);

          if (result.error) {
            toast.error("Saving failed! Refresh the page and try again.");
          } else {
            toast.success("Saved successfully!");
          }
        } catch (err) {
          toast.error("Saving failed! Refresh the page and try again.");
        }

        dispatch(deleteItems());
        navigate("/create");
      })();
    }
  }, [errorCurrPage, currentPage]);

  return (
    <>
      {currentPage == 0 && <CreateCategory />}
      {currentPage > 0 && currentPage <= 4 && <CreateQuestion />}
      {currentPage == 5 && (
        <div className="grow-1 self-center">
          <DotLoader className="mx-auto" />
        </div>
      )}
      {(currentPage < 0 || currentPage > 5) && setErrorCurrPage(true)}
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCreateItemsAllValues,
  selectCurrentPage,
  setResponseMsg,
} from "./createSlice";
import { useRecordCategoryAndQuestionsMutation } from "./createApiSlice";
import CreateCategory from "./CreateCategory";
import CreateQuestion from "./createQuestion/CreateQuestion";
import Loader from "../../components/Loader";

export default function CreateCatAndQMiddleware() {
  const [errorCurrPage, setErrorCurrPage] = useState(false);
  const currentPage = useSelector(selectCurrentPage);
  const createItemsAllValues = useSelector(selectCreateItemsAllValues);
  const [recordCategoryAndQuestions] = useRecordCategoryAndQuestionsMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorCurrPage) {
      dispatch(
        setResponseMsg({
          status: "error",
          msg: "Something went wrong! Refresh the page and try again.",
        })
      );

      navigate("/create");
    }

    if (currentPage == 5) {
      (async () => {
        try {
          const items = Object.entries(createItemsAllValues);
          const result = await recordCategoryAndQuestions(items);

          if (result.error) {
            dispatch(
              setResponseMsg({
                status: "error",
                msg: "Saving failed! Refresh the page and try again.",
              })
            );
          } else {
            dispatch(
              setResponseMsg({
                status: "success",
                msg: "Saved successfully!",
              })
            );
          }
        } catch (err) {
          dispatch(
            setResponseMsg({
              status: "error",
              msg: "Saving failed! Refresh the page and try again.",
            })
          );
        }

        navigate("/create");
      })();
    }
  }, [errorCurrPage, currentPage]);

  return (
    <>
      {currentPage == 0 && <CreateCategory />}
      {currentPage > 0 && currentPage <= 4 && <CreateQuestion />}
      {currentPage == 5 && <Loader />}
      {(currentPage < 0 || currentPage > 5) && setErrorCurrPage(true)}
    </>
  );
}

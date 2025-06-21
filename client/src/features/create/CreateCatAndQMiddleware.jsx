import { useSelector } from "react-redux";
import { selectCurrentPage } from "./createSlice";
import CreateCategory from "./CreateCategory";
import CreateQuestion from "./createQuestion/CreateQuestion";

export default function CreateCatAndQMiddleware() {
  const currentPage = useSelector(selectCurrentPage);

  return (
    <>
      {currentPage == 0 && <CreateCategory />}
      {currentPage > 0 && currentPage <= 4 && <CreateQuestion />}
      {currentPage == 5 && "Result Component with Dot Loader"}
      {/* import DotLoader from "react-spinners/DotLoader"; */}
      {(currentPage < 0 || currentPage > 5) &&
        "Error Component - delete redux values and navigate"}
    </>
  );
}

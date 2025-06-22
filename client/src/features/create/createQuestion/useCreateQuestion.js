import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentPage } from "../createSlice";
import { useGetCategoriesMutation } from "../../game/gameApiSlice";

export default function useCreateQuestion() {
  const [allCategoriesNames, setAllCategoriesNames] = useState([]);
  const currentPage = useSelector(selectCurrentPage);
  const [getCategories] = useGetCategoriesMutation();

  useEffect(() => {
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
    }
  }, []);

  return allCategoriesNames;
}

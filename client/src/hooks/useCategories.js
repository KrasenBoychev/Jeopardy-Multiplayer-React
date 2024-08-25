import { useEffect, useState } from "react";

export default function useCategories() {
  const defaultOption = "--- Choose Category ---";

  const [currCategoryCount, setCurrCategoryCount] = useState(0);
  const [moveToNextPage, setMoveToNextPage] = useState(false);

  const [catA, setCatA] = useState(defaultOption);
  const [catB, setCatB] = useState(defaultOption);
  const [catC, setCatC] = useState(defaultOption);
  const [catD, setCatD] = useState(defaultOption);
  const [allCategories, setAllCategories] = useState([
    defaultOption,
    "Maths",
    "Languages",
    "Biology",
    "History",
  ]);

  const categoriesInfo = {
    0: {
      category: catA,
      setCategory: setCatA,
    },
    1: {
      category: catB,
      setCategory: setCatB,
    },
    2: {
      category: catC,
      setCategory: setCatC,
    },
    3: {
      category: catD,
      setCategory: setCatD,
    },
  };

  useEffect(() => {
    (function changePage() {
      if (currCategoryCount == 4) {
        setTimeout(() => {
          setMoveToNextPage(true);
        }, 1000);
      }
    })();
  }, [currCategoryCount]);

  return [
    currCategoryCount,
    setCurrCategoryCount,
    moveToNextPage,
    allCategories,
    setAllCategories,
    categoriesInfo,
  ];
}

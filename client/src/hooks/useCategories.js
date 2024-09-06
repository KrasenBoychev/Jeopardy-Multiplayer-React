import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllCategories, getQuestions } from "../../api/game-api";
import { points } from "../common/gamePoints";

export default function useCategories() {
  const defaultOption = "--- Choose Category ---";

  const [currCategoryCount, setCurrCategoryCount] = useState(0);
  const [moveToNextPage, setMoveToNextPage] = useState(false);

  const [catA, setCatA] = useState(defaultOption);
  const [catB, setCatB] = useState(defaultOption);
  const [catC, setCatC] = useState(defaultOption);
  const [catD, setCatD] = useState(defaultOption);
  const [allCategories, setAllCategories] = useState([]);
  const [allCategoriesInfo, setAllCategoriesInfo] = useState([]);
  const [questions, setQuestions] = useState({});

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
    (async function getCategories() {
      if (allCategories.length == 0) {
        const categories = await getAllCategories();

        const categoriesNames = categories.map((c) => c.name);
        setAllCategories([defaultOption, ...categoriesNames]);

        setAllCategoriesInfo(categories);
      }
    })();
  });

  useEffect(() => {
    (async function changePage() {
      if (currCategoryCount == 4) {
        const categoriesIDs = allCategoriesInfo
          .filter((c) => [catA, catB, catC, catD].includes(c.name))
          .map((c) => c._id);

        try {
          const questionsResult = await getQuestions(categoriesIDs);

          const gameQuestions = {};

          [catA, catB, catC, catD].map((cat) => {
            const currCatInfo = allCategoriesInfo.filter(
              (catInfo) => catInfo.name == cat
            );
            const currCatID = currCatInfo[0]._id;

            const catQuestions = [];

            points.map((currPoints) => {
              const questionsMatching = questionsResult.filter(
                (question) =>
                  question.categoryId == currCatID &&
                  question.points == Number(currPoints)
              );

              const randomQuestion =
                questionsMatching[
                  Math.floor(Math.random() * questionsMatching.length)
                ];
              catQuestions.push(randomQuestion);
            });

            gameQuestions[cat] = catQuestions;
          });
  
          setQuestions(gameQuestions);
        } catch (error) {
          return toast.error(error.message);
        }

        setTimeout(() => {
          setMoveToNextPage(true);
        }, 500);
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
    defaultOption,
    questions,
    allCategoriesInfo,
  ];
}

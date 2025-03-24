import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllCategories, getQuestions } from "../../api/game-api";
import { points } from "../common/gamePoints";

export default function useCategories(socket, firstPlayer) {
  const defaultOption = "--- Choose Category ---";

  const [activePlayer, setActivePlayer] = useState(firstPlayer.username);
  const [currCategoryCount, setCurrCategoryCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const [moveToNextPage, setMoveToNextPage] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [allCategoriesInfo, setAllCategoriesInfo] = useState([]);
  const [questions, setQuestions] = useState({});

  const [categoriesNames, setCategoriesNames] = useState([
    defaultOption,
    defaultOption,
    defaultOption,
    defaultOption,
  ]);

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
    (async function changeActivePlayer() {
      socket?.on("getCategorySelected", ({ socketData }) => {
        const {
          categoriesNames,
          newCategories,
          newCategoryCount,
          newActivePlayer,
        } = socketData;

        setCategoriesNames(categoriesNames);
        setCurrCategoryCount(newCategoryCount);
        setAllCategories(newCategories);
        setActivePlayer(newActivePlayer);
      });
    })();
  }, [socket]);

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
                  Math.floor(randomNumber * questionsMatching.length)
                ];
              catQuestions.push({ question: randomQuestion, answered: false });
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
    activePlayer,
    setActivePlayer,
    currCategoryCount,
    setCurrCategoryCount,
    moveToNextPage,
    allCategories,
    setAllCategories,
    defaultOption,
    questions,
    setQuestions,
    setRandomNumber,
    categoriesNames,
    setCategoriesNames,
  ];
}

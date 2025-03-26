import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllCategories, getQuestions } from "../../api/game-api";
import { points } from "../common/gamePoints";
import { getFriendSocketId } from "../utils/gameUtils";

export default function useCategories(socket, firstPlayer, secondPlayer) {
  const defaultOption = "--- Choose Category ---";

  const [activePlayer, setActivePlayer] = useState(firstPlayer.username);
  const [currCategoryCount, setCurrCategoryCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const [moveToNextPage, setMoveToNextPage] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [allCategoriesInfo, setAllCategoriesInfo] = useState([]);
  const [questions, setQuestions] = useState({});
  const [callQuestions, setCallQuestions] = useState(false);

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

    socket?.on("getQuestions", ({ gameQuestions }) => {
      setQuestions(gameQuestions);

      setTimeout(() => {
        setMoveToNextPage(true);
      }, 500);
    });
  }, [socket]);

  useEffect(() => {
    (async function changePage() {
      if (currCategoryCount == 4) {
        const categoriesIDs = allCategoriesInfo
          .filter((c) => categoriesNames.includes(c.name))
          .map((c) => c._id);

        try {
          const questionsResult = await getQuestions(categoriesIDs);

          const gameQuestions = {};

          categoriesNames.map((catName) => {
            const currCatInfo = allCategoriesInfo.filter(
              (catInfo) => catInfo.name == catName
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

            gameQuestions[catName] = catQuestions;
          });

          setQuestions(gameQuestions);

          // active player has already changed (selectQuestion in Categories)
          const friendSocketId =
            activePlayer == firstPlayer.username
              ? firstPlayer.socketId
              : secondPlayer.socketId;

          await socket.emit("sendQuestions", {
            receiverSocketId: friendSocketId,
            gameQuestions,
          });

          setTimeout(() => {
            setMoveToNextPage(true);
          }, 500);
        } catch (error) {
          return toast.error(error.message);
        }
      }
    })();
  }, [callQuestions]);

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
    setCallQuestions,
  ];
}

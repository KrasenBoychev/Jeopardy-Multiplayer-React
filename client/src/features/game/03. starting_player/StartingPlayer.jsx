import { useState } from "react";
import Categories from "../04. categories/Categories";
import "./startingPlayer.css";
import "../game.css";
import { useGameContext } from "../../../contexts/GameContext";

export default function StartingPlayer() {
  const [categories, setCategories] = useState(false);
  const { firstPlayerUsername } = useGameContext();

  setTimeout(() => {
    setCategories(true);
  }, 2500);

  return categories ? (
    <Categories />
  ) : (
    <>
      <div className="game_container">
        <p className="starting_player">{firstPlayerUsername}</p>
      </div>
    </>
  );
}

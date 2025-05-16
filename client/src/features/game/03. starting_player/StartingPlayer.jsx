import { useState } from "react";
import { useSelector } from "react-redux";
import { selectFirstPlayer } from "../gameSlice";
import Categories from "../04. categories/Categories";
import "./startingPlayer.css";
import "../game.css";

export default function StartingPlayer() {
  const firstPlayer = useSelector(selectFirstPlayer);
  const [renderCategories, setRenderCategories] = useState(false);

  setTimeout(() => {
    setRenderCategories(true);
  }, 2500);

  return renderCategories ? (
    <Categories />
  ) : (
    <>
      <div className="game_container">
        <p className="starting_player">{firstPlayer.username}</p>
      </div>
    </>
  );
}

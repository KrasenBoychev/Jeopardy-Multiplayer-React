import { useState } from "react";
import "./startingPlayer.css";
import "../game.css";

import Categories from "../04. categories/Categories";

export default function StartingPlayer({ props }) {
  const { socket, firstPlayer, secondPlayer } = props;
  const [categories, setCategories] = useState(false);

  setTimeout(() => {
    setCategories(true);
  }, 2500);

  return categories ? (
    <Categories props={{ socket, firstPlayer, secondPlayer }} />
  ) : (
    <>
      <div className="game_container">
        <p className="starting_player">{firstPlayer.username}</p>
      </div>
    </>
  );
}

import { useState } from "react";
import "./startingPlayer.css";
import "../game.css";

import Categories from "../04. categories/Categories";

export default function StartingPlayer({ players }) {
  const [categories, setCategories] = useState(false);

  setTimeout(() => {
    setCategories(true);
  }, 2500);

  return categories ? (
    <Categories props={{ players }} />
  ) : (
    <>
      <div className="game_container">
        <p className="starting_player">{players.firstPlayer.username}</p>
      </div>
    </>
  );
}

import { useState } from "react";
import "./startingPlayer.css";
import "../game.css";

// import Categories from "../../playGame/categories/Categories";

export default function StartingPlayer({ players }) {
  const [categories, setCategories] = useState(false);

  setTimeout(() => {
    setCategories(true);
  }, 2500);

  return categories ? (
    <p>yee</p>
    // <Categories props={props} /> 
  ) : (
    <>
      <div className="game-container">
        <p className="visualize-starting-player">{players.firstPlayer.username}</p>
      </div>
    </>
  );
}

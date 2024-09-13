import { useState } from "react";

import './visualizePlayer.css'

import Categories from "../../playGame/categories/Categories";

export default function VisualizePlayer(props) {
  const [categories, setCategories] = useState(false);

  setTimeout(() => {
    setCategories(true);
  }, 2500);

  return categories ? <Categories props={props} /> : <p className="visualize-starting-player">{props.players.firstPlayer}</p>;
}

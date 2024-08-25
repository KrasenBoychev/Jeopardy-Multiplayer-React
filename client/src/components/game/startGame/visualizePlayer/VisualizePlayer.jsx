import { useState } from "react";
import Categories from "../../playGame/categories/Categories";

export default function VisualizePlayer(props) {
  const [categories, setCategories] = useState(false);

  setTimeout(() => {
    setCategories(true);
  }, 2000);

  return categories ? <Categories props={props} /> : <p>{props.players.firstPlayer}</p>;
}

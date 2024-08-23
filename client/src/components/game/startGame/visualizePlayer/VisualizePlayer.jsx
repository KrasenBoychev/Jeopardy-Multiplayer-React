import { useState } from "react";
import Categories from "../../playGame/Categories";

export default function VisualizePlayer({ startingPlayer }) {
  const [categories, setCategories] = useState(false);

  setTimeout(() => {
    setCategories(true);
  }, 2000);

  return categories ?  <Categories /> : <p>{startingPlayer}</p>;
}

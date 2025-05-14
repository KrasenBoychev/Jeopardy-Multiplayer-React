import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../authentication/authSlice";
import { selectActivePlayer } from "../../gameSlice";
import { selectCategoryCount } from "../categoriesSlice";

export default function CategoriesHeader() {
  const user = useSelector(selectCurrentUser);
  const activePlayer = useSelector(selectActivePlayer);
  const categoriesCount = useSelector(selectCategoryCount);

  return (
    <p
      className={
        user.username == activePlayer.username && categoriesCount <= 3
          ? "active_player player_categories"
          : "player_categories"
      }
    >
      {categoriesCount <= 3
        ? `${activePlayer.username} chooses category`
        : "Loading Questions..."}
    </p>
  );
}

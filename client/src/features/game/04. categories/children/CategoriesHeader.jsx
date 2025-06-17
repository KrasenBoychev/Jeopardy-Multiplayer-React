import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../authentication/authSlice";
import { selectActivePlayer } from "../../playersSlice";
import { selectCategoryCount } from "../categoriesSlice";

export default function CategoriesHeader() {
  const user = useSelector(selectCurrentUser);
  const activePlayer = useSelector(selectActivePlayer);
  const categoriesCount = useSelector(selectCategoryCount);

  return (
    <p
      className={`bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 uppercase text-5xl font-bold 
        ${
          user.username == activePlayer.username && categoriesCount <= 3
            ? "active_player"
            : "inactive_player"
        }`}
    >
      {categoriesCount <= 3
        ? `${activePlayer.username} chooses category`
        : "Loading Questions..."}
    </p>
  );
}

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../authentication/authSlice";
import { selectActivePlayer } from "../playersSlice";
import { selectCategoryCount } from "./categoriesSlice";

export default function CategoriesHeader() {
  const user = useSelector(selectCurrentUser);
  const activePlayer = useSelector(selectActivePlayer);
  const categoriesCount = useSelector(selectCategoryCount);

  return (
    <p
      className={`uppercase text-5xl font-bold bg-[#00000099] px-4 py-2 rounded-md
        ${
          categoriesCount > 3
            ? "text-chart-5"
            : user.username == activePlayer.username
            ? "text-active-player"
            : "text-destructive"
        } max-[1600px]:text-4xl max-[1400px]:text-3xl`}
    >
      {categoriesCount <= 3
        ? `${activePlayer.username} chooses category`
        : "Loading Questions..."}
    </p>
  );
}

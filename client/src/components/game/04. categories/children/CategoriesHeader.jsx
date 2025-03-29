import { useAuthContext } from "../../../../contexts/AuthContext";

export default function CategoriesHeader({ props }) {
  const { activePlayer, currCategoryCount } = props;
  const { username } = useAuthContext();

  return (
    <p
      className={
        username == activePlayer && currCategoryCount < 4
          ? "active_player player_categories"
          : "player_categories"
      }
    >
      {currCategoryCount < 4
        ? `${activePlayer} chooses category`
        : "Loading Questions..."}
    </p>
  );
}

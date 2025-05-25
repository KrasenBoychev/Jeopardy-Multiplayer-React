import { useSelector } from "react-redux";
import { selectActivePlayer } from "../../playersSlice";
import { selectCurrentUser } from "../../../authentication/authSlice";
import "../questions.css";

export default function QuestionsHeader({ isLoadingResult }) {
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectCurrentUser);

  return (
    <p
      className={
        user.username === activePlayer.username
          ? "active_player player_categories"
          : "player_categories"
      }
    >
      {isLoadingResult
        ? "Loading result..."
        : `${activePlayer.username} chooses question`}
    </p>
  );
}

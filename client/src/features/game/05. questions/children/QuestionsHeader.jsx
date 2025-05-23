import { useSelector } from "react-redux";
import { selectActivePlayer } from "../../playersSlice";
import { selectCurrentUser } from "../../../authentication/authSlice";
import "../questions.css";

export default function QuestionsHeader() {
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
      {activePlayer.username} chooses question
    </p>
  );
}

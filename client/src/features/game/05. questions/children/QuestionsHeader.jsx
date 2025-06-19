import { useSelector } from "react-redux";
import { selectActivePlayer } from "../../playersSlice";
import { selectCurrentUser } from "../../../authentication/authSlice";
import "../questions.css";

export default function QuestionsHeader({ isLoadingResult }) {
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectCurrentUser);

  return (
    <p
      className={`bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 uppercase text-5xl font-bold 
        ${
          user.username == activePlayer.username
            ? "active_player"
            : "inactive_player"
        }`}
    >
      {isLoadingResult
        ? "Loading result..."
        : `${activePlayer.username} chooses question`}
    </p>
  );
}

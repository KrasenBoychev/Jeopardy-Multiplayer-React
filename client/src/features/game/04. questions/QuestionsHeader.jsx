import { useSelector } from "react-redux";
import { selectActivePlayer } from "../playersSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import { selectQuestionsAnswered } from "./questionsSlice";

export default function QuestionsHeader() {
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectCurrentUser);
  const questionsAnswered = useSelector(selectQuestionsAnswered);

  return (
    <p
      className={`uppercase text-5xl font-bold bg-[#00000099] px-4 py-2 rounded-md 
        ${
          questionsAnswered == 16
            ? "text-chart-5"
            : user.username == activePlayer.username
            ? "text-active-player"
            : "text-destructive"
        } max-[1600px]:text-4xl max-[1400px]:text-3xl`}
    >
      {questionsAnswered == 16
        ? "Loading result..."
        : `${activePlayer.username} chooses question`}
    </p>
  );
}

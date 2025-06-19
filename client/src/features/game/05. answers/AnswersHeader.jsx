import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../authentication/authSlice";
import { selectActivePlayer } from "../playersSlice";
import { selectIsAnswerCorrect } from "./answerSlice";
import "./answers.css";
import "../game.css";

export default function AnswersHeader() {
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectCurrentUser);
  const isAnswerCorrect = useSelector(selectIsAnswerCorrect);

  return (
    <>
      <p
        className={`bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 uppercase text-5xl font-bold 
        ${
          isAnswerCorrect == null
            ? user.username === activePlayer.username
              ? "active_player"
              : "inactive_player"
            : isAnswerCorrect
            ? "answer_correct"
            : "answer_wrong"
        }`}
      >
        {isAnswerCorrect == null
          ? `${activePlayer.username} answers question`
          : isAnswerCorrect
          ? "Correct Answer"
          : "Wrong Answer"}
      </p>
    </>
  );
}

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../authentication/authSlice";
import { selectActivePlayer } from "../playersSlice";
import { selectIsAnswerCorrect } from "./answerSlice";

export default function AnswersHeader() {
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectCurrentUser);
  const isAnswerCorrect = useSelector(selectIsAnswerCorrect);

  return (
    <>
      <p
        className={`uppercase text-5xl font-bold bg-[#00000099] px-4 py-2 rounded-md
        ${
          isAnswerCorrect == null
            ? user.username === activePlayer.username
              ? "text-active-player"
              : "text-destructive"
            : isAnswerCorrect
            ? "bg-active-player"
            : "bg-destructive"
        } max-[1600px]:text-4xl max-[1400px]:text-3xl`}
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

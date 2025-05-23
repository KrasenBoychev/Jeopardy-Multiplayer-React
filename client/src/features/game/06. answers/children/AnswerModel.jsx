import { useAuthContext } from "../../../../contexts/AuthContext";
import { useGameContext } from "../../../../contexts/GameContext";
import "../answers.css";

export default function AnswerModel({ props }) {
  const {
    answer,
    index,
    setAnswerClicked,
    activePlayer,
    currQuestion,
    isAnswerClicked,
    setIsAnswerClicked,
    isAnswerCorrect,
  } = props;

  const { username } = useAuthContext();
  const { socket, friendSocketId } = useGameContext();

  const answerQuestionClickHandler = async () => {
    setAnswerClicked(answer);
    setIsAnswerClicked(true);

    await socket.emit("sendAnswerClicked", {
      receiverSocketId: friendSocketId,
      answerChosen: answer,
    });
  };

  return (
    <button
      key={answer + index}
      disabled={username != activePlayer || isAnswerClicked ? true : false}
      onClick={answerQuestionClickHandler}
      className={
        isAnswerCorrect == null
          ? username === activePlayer
            ? "answer_box answer_box_active"
            : "answer_box"
          : isAnswerCorrect && currQuestion.correctAnswer == answer
          ? "answer_box answer_correct"
          : !isAnswerCorrect
          ? currQuestion.correctAnswer == answer
            ? "answer_box answer_correct"
            : "answer_box answer_wrong"
          : "answer_box inactive_player"
      }
    >
      {answer}
    </button>
  );
}

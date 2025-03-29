import { useAuthContext } from "../../../../contexts/AuthContext";
import { useGameContext } from "../../../../contexts/GameContext";
import "../questions.css";

export default function QuestionModel({ props }) {
  const {
    activePlayer,
    categoryName,
    question,
    questionAnswered,
    setShowQuestion,
    setCurrCategory,
    setCurrQuestion,
  } = props;
  
  const { username } = useAuthContext();
  const { socket, friendSocketId } = useGameContext();

  const showQuestionClickHandler = async () => {
    if (questionAnswered) {
      return;
    }

    setShowQuestion(true);
    setCurrCategory(categoryName);
    setCurrQuestion(question);

    await socket.emit("sendQuestionOpened", {
      receiverSocketId: friendSocketId,
      categoryName,
      question,
    });
  };

  return (
    <button
      className={
        questionAnswered
          ? "question_box question_answered"
          : username === activePlayer
          ? "question_box active_box"
          : "question_box inactive_box"
      }
      disabled={username === activePlayer ? false : true}
      onClick={showQuestionClickHandler}
    >
      {question.points}
    </button>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../authentication/authSlice";
import { selectActivePlayer } from "../../playersSlice";
import "../questions.css";
import { updateIsQuestionChosen } from "../questionsSlice";

export default function QuestionModel({ question }) {
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const showQuestionClickHandler = async () => {
    dispatch(updateIsQuestionChosen());
    // if (questionAnswered) {
    //   return;
    // }
    // setShowQuestion(true);
    // setCurrCategory(categoryName);
    // setCurrQuestion(question);
    // await socket.emit("sendQuestionOpened", {
    //   receiverSocketId: friendSocketId,
    //   categoryName,
    //   question,
    // });
  };

  return (
    <button
      className={
        question.answered
          ? "question_box question_answered"
          : user.username === activePlayer.username
          ? "question_box active_box"
          : "question_box inactive_box"
      }
      disabled={user.username === activePlayer.username ? false : true}
      onClick={showQuestionClickHandler}
    >
      {question.points}
    </button>
  );
}

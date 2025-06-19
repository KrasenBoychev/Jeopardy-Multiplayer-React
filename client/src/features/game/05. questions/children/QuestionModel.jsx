import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../authentication/authSlice";
import { selectActivePlayer, selectRivalPlayer } from "../../playersSlice";
import "../questions.css";
import { updateQuestionChosen } from "../questionsSlice";
import { setSocketReq } from "../../../socket_connection/socketSlice";

export default function QuestionModel({ question }) {
  const activePlayer = useSelector(selectActivePlayer);
  const rivalPlayer = useSelector(selectRivalPlayer);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const showQuestionClickHandler = async () => {
    dispatch(updateQuestionChosen(question));
    dispatch(
      setSocketReq({
        socketReqName: "sendQuestionChosen",
        socketData: {
          receiverSocketId: rivalPlayer.socketId,
          questionChosen: question,
        },
      })
    );
  };

  return (
    // <button
    //   className={
    //     question.answered
    //       ? "question_box question_answered"
    //       : user.username === activePlayer.username
    //       ? "question_box active_box"
    //       : "question_box inactive_box"
    //   }
    //   disabled={user.username !== activePlayer.username || question.answered ? true : false}
    //   onClick={showQuestionClickHandler}
    // >
    //   {question.points}
    // </button>

    <button
      className="p-[3px] relative question_box"
      disabled={
        user.username !== activePlayer.username || question.answered
          ? true
          : false
      }
      onClick={showQuestionClickHandler}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
      <div
        className={`px-8 py-2 rounded-[6px] bg-black relative group transition duration-200 ${
          question.answered
            ? "bg-white text-black"
            : `text-white ${user.username === activePlayer.username && "hover:bg-transparent cursor-pointer"}`
        } }`}
      >
        {question.points}
      </div>
    </button>
  );
}

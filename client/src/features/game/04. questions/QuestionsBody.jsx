import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../authentication/authSlice";
import { selectActivePlayer, selectRoomId } from "../playersSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";

export default function QuestionsBody({ question }) {
  const activePlayer = useSelector(selectActivePlayer);
  const roomId = useSelector(selectRoomId);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const showQuestionClickHandler = async () => {
    if (user.username !== activePlayer.username || question.answered) {
      return;
    }

    dispatch(
      setSocketReq({
        socketReqName: "send_question_chosen",
        socketData: {
          roomId,
          question,
        },
      })
    );
  };

  return (
    <div
      className="flex items-center justify-center"
      onClick={showQuestionClickHandler}
    >
      <div
        className={`relative h-20 w-20 flex items-center justify-center text-[20px] rounded-full shadow-[inset_0_0_13px_black] ${
          question.answered
            ? "bg-black text-white"
            : `${
                user.username === activePlayer.username &&
                "bg-white text-black cursor-pointer hover:font-bold hover:text-[24px] hover:shadow-[inset_0_0_18px_black] max-[1800px]:hover:text-[22px] max-[1600px]:hover:text-[20px] max-[1400px]:hover:text-[18px]"
              }`
        } max-[1800px]:h-18 max-[1800px]:w-18 max-[1600px]:h-16 max-[1600px]:w-16 max-[1400px]:h-14 max-[1400px]:w-14 
          max-[1800px]:text-[18px] max-[1600px]:text-[16px] max-[1400px]:text-[14px] `}
      >
        <span className="">{question.points}</span>
        {question.answered && (
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-destructive rotate-145"></div>
        )}
      </div>
    </div>
  );
}

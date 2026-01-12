import { useDispatch, useSelector } from "react-redux";
import { deletePlayersDetails, selectRoomId } from "../playersSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { deleteGameDetails } from "../gameSlice";
import { deleteCategories } from "../03. categories/categoriesSlice";
import { deleteQuestions } from "../04. questions/questionsSlice";

export default function Confrim({ setShowConfirmMessage }) {
  const roomId = useSelector(selectRoomId);
  const dispatch = useDispatch();

  const declineLeavingClickHandler = () => {
    setShowConfirmMessage(false);
  };

  const confirmLeavingClickHandler = async () => {
    dispatch(
      setSocketReq({
        socketReqName: "leave_game",
        socketData: {
          roomId,
        },
      })
    );

    dispatch(deleteGameDetails());
    dispatch(deletePlayersDetails());
    dispatch(deleteCategories());
    dispatch(deleteQuestions());
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center bg-[#00000099] z-9999">
      <div className="relative w-fit h-fit top-5 flex flex-col gap-5 px-10 py-5 text-center uppercase bg-white rounded-md shadow-[inset_0_0_10px_red]">
        <h2 className="text-[20px] max-[1600px]:text-[18px] max-[1400px]:text-[16px]">
          Are you sure you want to leave the game?
        </h2>
        <div className="flex justify-evenly">
          <button
            className="px-5 py-2 text-[15px] text-white font-bold uppercase rounded-md bg-chart-2 cursor-pointer hover:text-black max-[1600px]:text-[13px] max-[1400px]:text-[11px]"
            onClick={confirmLeavingClickHandler}
          >
            Yes
          </button>
          <button
            className="px-5 py-2 text-[15px] text-white font-bold uppercase rounded-md bg-destructive cursor-pointer hover:text-black max-[1600px]:text-[13px] max-[1400px]:text-[11px]"
            onClick={declineLeavingClickHandler}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { selectRivalPlayer, setRivalPlayer } from "../../playersSlice";
import { selectCurrentUser } from "../../../authentication/authSlice";
import { setSocketReq } from "../../../socket_connection/socketSlice";
import { useEffect } from "react";
import { selectActiveFriends } from "../../gameSlice";
import toast from "react-hot-toast";

export default function SelectedOpponent() {
  const user = useSelector(selectCurrentUser);
  const rivalPlayer = useSelector(selectRivalPlayer);
  const activeFriends = useSelector(selectActiveFriends);
  const dispatch = useDispatch();

  useEffect(() => {
    const rivalPlayerDetails = activeFriends.find(
      (friend) => friend[1].username === rivalPlayer[1].username
    );

    if (rivalPlayerDetails[1].status === "In Game") {
      dispatch(setRivalPlayer(null));
      toast.error(
        rivalPlayerDetails[1].username +
          " started game with another player. Invitation canceled."
      );
    }
  }, [activeFriends]);

  const gameCancelationClickHandler = async () => {
    dispatch(
      setSocketReq({
        socketReqName: "set_cancel_game_invitation",
        socketData: {
          receiverSocketId: rivalPlayer[0],
          username: user.username,
        },
      })
    );

    dispatch(setRivalPlayer(null));
  };

  return (
    <>
      <h3 className="pb-2 text-[18px] text-center border-b-[1px] border-b-chart-5 uppercase font-bold max-[1600px]:text-[16px] max-[1400px]:text-[14px]">
        Waiting for opponent...
      </h3>
      <p className="flex-1 self-center content-center text-[40px] max-[1600px]:text-[35px] max-[1400px]:text-[30px]">
        {rivalPlayer[1].username}
      </p>
      <button
        className="bg-destructive text-sm p-2 rounded-xl text-white lowercase cursor-pointer hover:text-black"
        onClick={gameCancelationClickHandler}
      >
        Cancel
      </button>
    </>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../authentication/authSlice";
import { selectGameReqSentBy } from "../../../gameSlice";
import { setRivalPlayer } from "../../../playersSlice";
import { setSocketReq } from "../../../../socket_connection/socketSlice";
import toast from "react-hot-toast";
import GameReqBtns from "./GameReqBtns";

export default function SelectFriend({ friend }) {
  const user = useSelector(selectCurrentUser);
  const gameReqSentBy = useSelector(selectGameReqSentBy);
  const dispatch = useDispatch();

  const inviteFriendClickHandler = async () => {
    if (gameReqSentBy.includes(friend[1].username)) {
      return;
    }

    dispatch(
      setSocketReq({
        socketReqName: "send_game_req",
        socketData: {
          receiverSocketId: friend[0],
          username: user.username,
        },
      })
    );

    dispatch(setRivalPlayer(friend));
    toast.success("Game request sent to " + friend[1].username);
  };

  return (
    <li
      className={`flex justify-between gap-2 rounded-sm ${
        !gameReqSentBy.includes(friend[1].username) &&
        "hover:bg-white hover:text-black cursor-pointer"
      }`}
      onClick={() => inviteFriendClickHandler()}
    >
      <div className="relative flex flex-1 items-center">
        <span className="flex-1 text-center">{friend[1].username}</span>
        {gameReqSentBy.includes(friend[1].username) && (
          <GameReqBtns friend={friend} />
        )}
      </div>
    </li>
  );
}

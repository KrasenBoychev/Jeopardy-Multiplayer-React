import { useDispatch, useSelector } from "react-redux";
import { setSocketReq } from "../../../../socket_connection/socketSlice";
import { selectFriends } from "../friendsSlice";
import { selectCurrentUser } from "../../../../authentication/authSlice";
import {
  updateGameReqSentBy,
  updateIsNewGameStarted,
} from "../../../gameSlice";
import { updateRivalPlayer } from "../../../playersSlice";
import { useChangeGameInProgressMutation } from "../../../gameApiSlice";
import { setGameInProgress } from "../../game_room/setGameFunc";

export default function GameReqBtns({ friendUsername }) {
  const user = useSelector(selectCurrentUser);
  const friends = useSelector(selectFriends);
  const [changeGameInProgress] = useChangeGameInProgressMutation();
  const dispatch = useDispatch();

  const acceptGameReqClickHandler = async () => {
    const findFriend = friends.find(
      (friend) => friend.username == friendUsername
    );

    dispatch(
      updateRivalPlayer({
        username: findFriend.username,
        socketId: findFriend.socketId,
        updateType: "add",
      })
    );

    await setGameInProgress(
      user.username,
      friends,
      changeGameInProgress,
      dispatch
    );

    dispatch(
      setSocketReq({
        socketReqName: "sendAcceptGameRes",
        socketData: {
          receiverSocketId: findFriend.socketId,
        },
      })
    );

    dispatch(updateIsNewGameStarted());
  };

  const rejectGameReqClickHandler = () => {
    const findFriend = friends.find(
      (friend) => friend.username == friendUsername
    );

    dispatch(
      setSocketReq({
        socketReqName: "sendRejectGameRes",
        socketData: {
          receiverSocketId: findFriend.socketId,
          username: user.username,
        },
      })
    );

    dispatch(
      updateGameReqSentBy({
        username: friendUsername,
        updateType: "remove",
      })
    );
  };

  return (
    <span className="friend_game_req">
      <i
        className="fa-solid fa-circle-check text-green-500"
        onClick={acceptGameReqClickHandler}
      ></i>
      <i
        className="fa-solid fa-circle-xmark text-destructive"
        onClick={rejectGameReqClickHandler}
      ></i>
    </span>
  );
}

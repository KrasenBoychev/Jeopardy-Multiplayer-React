import { useDispatch, useSelector } from "react-redux";
import { setSocketReq } from "../../../../socket_connection/socketSlice";
import { selectFriends } from "../../friends_list/friendsSlice";
import { selectCurrentUser } from "../../../../authentication/authSlice";
import {
  updateGameReqSentBy,
  updateIsNewGameStarted,
} from "../../../gameSlice";
import { updateRivalPlayer } from "../../../playersSlice";
import { useChangeGameInProgressMutation } from "../../../gameApiSlice";
import { setGameInProgress } from "../setGameFunc";

export default function GameReqBtns({ friendUsername }) {
  const user = useSelector(selectCurrentUser);
  const friends = useSelector(selectFriends);
  const [changeGameInProgress, { isLoading }] =
    useChangeGameInProgressMutation();
  const dispatch = useDispatch();

  const acceptGameReqClickHandler = async () => {
    await setGameInProgress(
      user.username,
      friends,
      changeGameInProgress,
      dispatch
    );

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
    <div className="flex items-center gap-2">
      {isLoading ? (
        <span className="text-sm">Connecting...</span>
      ) : (
        <>
          <i
            className="fa-solid fa-circle-check text-green-500 cursor-pointer hover:text-white"
            onClick={acceptGameReqClickHandler}
          />
          <i
            className="fa-solid fa-circle-xmark text-destructive cursor-pointer hover:text-white"
            onClick={rejectGameReqClickHandler}
          />
        </>
      )}
    </div>
  );
}

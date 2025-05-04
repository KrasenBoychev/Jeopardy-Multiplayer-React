import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewFriend,
  updateFriendGameInProgress,
  updateFriendStatus,
} from "../../game/01. play_page/children/friendsList/friendsSlice";
import { useGetNotificationsQuery } from "../../../features/notifications/notificationsApiSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import {
  updateGameReqSentBy,
  updateIsNewGameStarted,
  updateReadyToPlay,
  updateRivalPlayer,
  updateSetStartGameDetails,
  updateStartingPlayers,
} from "../../game/gameSlice";
import toast from "react-hot-toast";
import { setCategories } from "../../game/04. categories/categoriesSlice";
import { setSocketReq } from "../socketSlice";

export default function useListeners(socket) {
  const user = useSelector(selectCurrentUser);
  const { refetch } = useGetNotificationsQuery("getNotifications");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.gameDetails.gameInProgress) {
      socket?.on("getFriendStatus", ({ senderInfo }) => {
        dispatch(updateFriendStatus(senderInfo));
        dispatch(
          updateGameReqSentBy({
            username: senderInfo.username,
            updateType: "remove",
          })
        );

        dispatch(
          updateRivalPlayer({
            username: senderInfo.username,
            socketId: "",
            updateType: "remove",
          })
        );
      });

      socket?.on("getUpdateNotifications", () => {
        refetch();
      });

      socket?.on("getFriendReqAccepted", ({ userDetails }) => {
        dispatch(addNewFriend(userDetails));
        refetch();
      });

      socket?.on("receiveGameReq", ({ username }) => {
        dispatch(updateGameReqSentBy({ username, updateType: "add" }));
      });

      socket?.on("receiveRejectGameRes", ({ username }) => {
        dispatch(
          updateRivalPlayer({ username, socketId: "", updateType: "remove" })
        );
        toast.error(username + " rejected your game request");
      });

      socket?.on("getCancelGameInvitation", ({ username }) => {
        dispatch(updateGameReqSentBy({ username, updateType: "remove" }));
      });

      socket?.on("getAcceptGameRes", () => {
        dispatch(updateIsNewGameStarted());
        dispatch(updateSetStartGameDetails());
      });

      socket?.on("getFriendGameInProgress", ({ username }) => {
        dispatch(updateFriendGameInProgress(username));
      });

      socket?.on("getGameDetails", ({ gameDetails }) => {
        dispatch(
          updateStartingPlayers({
            firstPlayerDetails: gameDetails.firstPlayerDetails,
            secondPlayerDetails: gameDetails.secondPlayerDetails,
            updateType: "add",
          })
        );

        dispatch(setCategories(gameDetails.newCategories));
        dispatch(updateReadyToPlay());

        dispatch(
          setSocketReq({
            socketReqName: "setReadyToPlay",
            socketData: {
              receiverSocketId: gameDetails.userSocketId,
            },
          })
        );
      });

      socket?.on("getReadyToPlay", () => {
        dispatch(updateReadyToPlay());
      });
    }
  }, [socket]);
}

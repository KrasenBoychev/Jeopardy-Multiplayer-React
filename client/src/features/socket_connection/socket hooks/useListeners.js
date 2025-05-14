import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addNewFriend,
  updateFriendGameInProgress,
  updateFriendStatus,
} from "../../game/01. play_page/children/friendsList/friendsSlice";
import { useGetNotificationsQuery } from "../../../features/notifications/notificationsApiSlice";
import {
  selectCurrentUser,
  updateFriendsList,
} from "../../authentication/authSlice";
import {
  setActivePlayer,
  updateGameReqSentBy,
  updateIsNewGameStarted,
  updateReadyToPlay,
  updateRivalPlayer,
  updateSetStartGameDetails,
  updateStartingPlayers,
} from "../../game/gameSlice";
import { setSocketReq } from "../socketSlice";
import { setCategories } from "../../game/04. categories/categoriesSlice";

export default function useListeners(socket) {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { refetch } = useGetNotificationsQuery("getNotifications");

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

      socket?.on("getExitUserStatus", ({ senderInfo }) => {
        dispatch(updateFriendStatus(senderInfo));
        dispatch(updateFriendGameInProgress(senderInfo.username));
      });

      socket?.on("getUpdateNotifications", () => {
        refetch();
      });

      socket?.on("getFriendReqAccepted", ({ userDetails }) => {
        dispatch(addNewFriend(userDetails));
        dispatch(updateFriendsList(userDetails.username));
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

        dispatch(updateReadyToPlay());
        dispatch(setActivePlayer(gameDetails.firstPlayerDetails));
        dispatch(setCategories(gameDetails.allCategories));

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

      socket?.on("getExitGame", async ({ username }) => {
        toast.error(username + " exit the game. Press 'EXIT' to leave");
        dispatch(
          updateRivalPlayer({ username, socketId: "", updateType: "remove" })
        );
      });
    }
  }, [socket]);
}

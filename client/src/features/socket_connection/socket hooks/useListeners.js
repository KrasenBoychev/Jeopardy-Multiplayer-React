import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addNewFriend,
  updateFriendGameInProgress,
  updateFriendStatus,
} from "../../game/01. play_page/friends_list/friendsSlice";
import { useGetNotificationsQuery } from "../../../features/notifications/notificationsApiSlice";
import {
  selectCurrentUser,
  updateFriendsList,
} from "../../authentication/authSlice";
import {
  updateGameReqSentBy,
  updateIsNewGameStarted,
  updateReadyToPlay,
  updateSetStartGameDetails,
} from "../../game/gameSlice";
import {
  updateRivalPlayer,
  setFirstSecondActivePlayer,
} from "../../game/playersSlice";
import { setSocketReq } from "../socketSlice";
import { setCategories } from "../../game/03. categories/categoriesSlice";

export default function useListeners(socket) {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { refetch } = useGetNotificationsQuery("getNotifications");

  useEffect(() => {
    if (!socket || user?.gameDetails?.gameInProgress) return;

    const handleGetFriendStatus = ({ senderInfo }) => {
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
    };

    const handleGetExitUserStatus = ({ senderInfo }) => {
      dispatch(updateFriendStatus(senderInfo));
      dispatch(updateFriendGameInProgress(senderInfo.username));
    };

    const handleGetUpdateNotifications = () => {
      refetch();
    };

    const handleGetFriendReqAccepted = ({ userDetails }) => {
      dispatch(addNewFriend(userDetails));
      dispatch(updateFriendsList(userDetails.username));
      refetch();
    };

    const handleReceiveGameReq = ({ username }) => {
      dispatch(updateGameReqSentBy({ username, updateType: "add" }));
    };

    const handleReceiveRejectGameRes = ({ username }) => {
      dispatch(
        updateRivalPlayer({ username, socketId: "", updateType: "remove" })
      );
      toast.error(username + " rejected your game request");
    };

    const handleGetCancelGameInvitation = ({ username }) => {
      dispatch(updateGameReqSentBy({ username, updateType: "remove" }));
    };

    const handleGetAcceptGameRes = () => {
      dispatch(updateIsNewGameStarted());
      dispatch(updateSetStartGameDetails());
    };

    const handleGetFriendGameInProgress = ({ username }) => {
      dispatch(updateFriendGameInProgress(username));
    };

    const handleGetGameDetails = ({ gameDetails }) => {
      dispatch(
        setFirstSecondActivePlayer({
          firstPlayerDetails: gameDetails.firstPlayerDetails,
          secondPlayerDetails: gameDetails.secondPlayerDetails,
        })
      );

      setTimeout(() => {
        dispatch(updateReadyToPlay());
        dispatch(setCategories(gameDetails.allCategories));
        dispatch(
          setSocketReq({
            socketReqName: "setReadyToPlay",
            socketData: {
              receiverSocketId: gameDetails.userSocketId,
            },
          })
        );
      }, 2000);
    };

    const handleGetReadyToPlay = () => {
      dispatch(updateReadyToPlay());
    };

    const handleGetExitGame = async ({ username }) => {
      toast.error(username + " exit the game. Press 'EXIT' to leave");
      dispatch(
        updateRivalPlayer({ username, socketId: "", updateType: "remove" })
      );
    };

    socket.on("getFriendStatus", handleGetFriendStatus);
    socket.on("getExitUserStatus", handleGetExitUserStatus);
    socket.on("getUpdateNotifications", handleGetUpdateNotifications);
    socket.on("getFriendReqAccepted", handleGetFriendReqAccepted);
    socket.on("receiveGameReq", handleReceiveGameReq);
    socket.on("receiveRejectGameRes", handleReceiveRejectGameRes);
    socket.on("getCancelGameInvitation", handleGetCancelGameInvitation);
    socket.on("getAcceptGameRes", handleGetAcceptGameRes);
    socket.on("getFriendGameInProgress", handleGetFriendGameInProgress);
    socket.on("getGameDetails", handleGetGameDetails);
    socket.on("getReadyToPlay", handleGetReadyToPlay);
    socket.on("getExitGame", handleGetExitGame);

    return () => {
      socket.off("getFriendStatus", handleGetFriendStatus);
      socket.off("getExitUserStatus", handleGetExitUserStatus);
      socket.off("getUpdateNotifications", handleGetUpdateNotifications);
      socket.off("getFriendReqAccepted", handleGetFriendReqAccepted);
      socket.off("receiveGameReq", handleReceiveGameReq);
      socket.off("receiveRejectGameRes", handleReceiveRejectGameRes);
      socket.off("getCancelGameInvitation", handleGetCancelGameInvitation);
      socket.off("getAcceptGameRes", handleGetAcceptGameRes);
      socket.off("getFriendGameInProgress", handleGetFriendGameInProgress);
      socket.off("getGameDetails", handleGetGameDetails);
      socket.off("getReadyToPlay", handleGetReadyToPlay);
      socket.off("getExitGame", handleGetExitGame);
    };
  }, [socket]);
}

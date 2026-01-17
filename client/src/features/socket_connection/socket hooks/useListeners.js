import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetNotificationsQuery } from "../../../features/notifications/notificationsApiSlice";
import {
  updateGameReqSentBy,
  setActiveFriends,
  selectIsNewGameStarted,
} from "../../game/gameSlice";
import { setRivalPlayer } from "../../game/playersSlice";
import { useGetFriendsListQuery } from "../../game/01. play_page/friends_list/friendsApiSlice";
import { setUserOnlineFromAnotherDevice } from "../../authentication/authSlice";

export default function useListeners(socket) {
  const isNewGameStarted = useSelector(selectIsNewGameStarted);

  const dispatch = useDispatch();
  const { refetch: refetchNotifications } =
    useGetNotificationsQuery("getNotifications");
  const { refetch: refetchFriendsList } =
    useGetFriendsListQuery("getFriendsList");

  useEffect(() => {
    if (!socket || isNewGameStarted) return;

    const handleUserLoggedInFromAnotherDevice = () => {
      dispatch(setUserOnlineFromAnotherDevice(true));
    };

    const handleUserListUpdate = (updatedFriends) => {
      dispatch(setActiveFriends(updatedFriends));
    };

    const handleGetUpdateNotifications = () => {
      refetchNotifications();
    };

    const handleGetFriendReqAccepted = () => {
      refetchFriendsList();
      refetchNotifications();
    };

    const handleReceiveGameReq = ({ username }) => {
      dispatch(updateGameReqSentBy({ username, updateType: "add" }));
    };

    const handleReceiveRejectGameRes = ({ username }) => {
      dispatch(setRivalPlayer(null));
      toast.error(username + " rejected your game request");
    };

    const handleGetCancelGameInvitation = ({ username }) => {
      dispatch(updateGameReqSentBy({ username, updateType: "remove" }));
    };

    socket.on(
      "logged_in_from_another_device",
      handleUserLoggedInFromAnotherDevice
    );
    socket.on("user_list_update", handleUserListUpdate);
    socket.on("get_update_notifications", handleGetUpdateNotifications);
    socket.on("get_friend_req_accepted", handleGetFriendReqAccepted);
    socket.on("receive_game_req", handleReceiveGameReq);
    socket.on("receive_reject_game_res", handleReceiveRejectGameRes);
    socket.on("get_cancel_game_invitation", handleGetCancelGameInvitation);

    return () => {
      socket.off(
        "logged_in_from_another_device",
        handleUserLoggedInFromAnotherDevice
      );
      socket.off("user_list_update", handleUserListUpdate);
      socket.off("get_update_notifications", handleGetUpdateNotifications);
      socket.off("get_friend_req_accepted", handleGetFriendReqAccepted);
      socket.off("receive_game_req", handleReceiveGameReq);
      socket.off("receive_reject_game_res", handleReceiveRejectGameRes);
      socket.off("get_cancel_game_invitation", handleGetCancelGameInvitation);
    };
  }, [socket]);
}

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addNewFriend,
  updateFriendStatus,
} from "../../game/01. play_page/children/friendsList/friendsSlice";
import { useGetNotificationsQuery } from "../../../features/notifications/notificationsApiSlice";

export default function useListeners(socket) {
  const { refetch } = useGetNotificationsQuery("getNotifications");
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("getFriendStatus", ({ senderInfo }) => {
      dispatch(updateFriendStatus(senderInfo));
    });

    socket?.on("getUpdateNotifications", () => {
      refetch();
    });

    socket?.on("getFriendReqAccepted", ({ userDetails }) => {
      dispatch(addNewFriend(userDetails));
      refetch();
    });
  }, [socket]);
}

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFriendStatus } from "../../game/01. play_page/children/friendsList/friendsSlice";
import toast from "react-hot-toast";
import { useGetNotificationsQuery } from "../../../components/notifications/notificationsApiSlice";

export default function useFriends(socket) {
  const { refetch } = useGetNotificationsQuery("getNotifications");
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("getFriendStatus", ({ senderInfo }) => {
      dispatch(updateFriendStatus(senderInfo));
    });

    socket?.on("friendReqReceived", () => {
      refetch();
    });
  }, [socket]);
}

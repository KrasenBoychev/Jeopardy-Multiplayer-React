import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewFriend,
  updateFriendStatus,
} from "../../game/01. play_page/children/friendsList/friendsSlice";
import { useGetNotificationsQuery } from "../../../features/notifications/notificationsApiSlice";
import { selectCurrentUser } from "../../authentication/authSlice";

export default function useListeners(socket) {
  const user = useSelector(selectCurrentUser);
  const { refetch } = useGetNotificationsQuery("getNotifications");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.gameDetails.gameInProgress) {
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
    }
  }, [socket]);
}

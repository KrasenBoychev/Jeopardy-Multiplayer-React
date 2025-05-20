import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSendFriendResMutation } from "../../game/01. play_page/children/friends_list/friendsApiSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { selectCurrentUser, updateFriendsList } from "../../authentication/authSlice";
import { addNewFriend } from "../../game/01. play_page/children/friends_list/friendsSlice";
import { useGetNotificationsQuery } from "../notificationsApiSlice";

export default function AcceptNotification({ notification }) {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [sendFriendRes] = useSendFriendResMutation();
  const { refetch } = useGetNotificationsQuery("getNotifications");

  const acceptNotificationClickHandler = async () => {
    const friendUsername = notification.sentBy;
    const notificationType = notification.type;

    try {
      if (notificationType == "addFriendReq") {
        const sendFriendResServerRes = await sendFriendRes({
          friendUsername,
          response: "accepted",
        });

        const friendDetails = sendFriendResServerRes.data;

        if (friendDetails.online === true) {
          dispatch(
            setSocketReq({
              socketReqName: "setFriendReqAccepted",
              socketData: {
                receiverSocketId: friendDetails.socketId,
                userDetails: {
                  username: user.username,
                  online: user.gameDetails.online,
                  socketId: user.gameDetails.socketId,
                  gameInProgress: user.gameDetails.gameInProgress,
                },
              },
            })
          );
        }
      
        dispatch(addNewFriend(friendDetails));
        dispatch(updateFriendsList(friendUsername))
      }

      refetch();
    } catch (error) {
      toast.error("Cannot accept the notification");
      console.log(error.message);
    }
  };

  return (
    <button
      className="notification_btn_accept"
      onClick={acceptNotificationClickHandler}
    >
      Accept
    </button>
  );
}

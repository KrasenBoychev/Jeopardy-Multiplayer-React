import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSendFriendResMutation } from "../../game/01. play_page/children/friendsList/friendsApiSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { useGetNotificationsQuery } from "../notificationsApiSlice";

export default function RejectNotification({ notification }) {
  const dispatch = useDispatch();
  const [sendFriendRes] = useSendFriendResMutation();
  const { refetch } = useGetNotificationsQuery("getNotifications");

  const rejectNotificationClickHandler = async (e) => {
    const friendUsername = e.target.id;
    const notificationType = e.target.value;

    try {
      if (notificationType == "addFriendReq") {
        const sendFriendResServerRes = await sendFriendRes({
          friendUsername,
          response: "rejected",
        });

        const friendDetails = sendFriendResServerRes.data;

        if (friendDetails.online === true) {
          dispatch(
            setSocketReq({
              socketReqName: "setUpdateNotifications",
              socketData: {
                receiverSocketId: friendDetails.socketId,
              },
            })
          );
        }
      }

      // else if (notificationType == "gameInvitation") {
      //   const findFriend = friendsList.find(
      //     (friend) => friend.username == friendUsername
      //   );

      //   if (findFriend && findFriend.online && !findFriend.gameInProgress) {
      //     await socket.emit("setRejectGameInvitation", {
      //       receiverSocketId: findFriend.socketId,
      //       userUsername: username,
      //     });
      //   } else {
      //     // If a bug occurs, then this message will show
      //     toast.error(
      //       friendUsername + " is no longer online - please refresh the page"
      //     );
      //   }

      //   removeNotificationFromNotificationsList(
      //     setNotificationsList,
      //     friendUsername,
      //     notificationType
      //   );
      // }
      refetch();
    } catch (error) {
      toast.error("Cannot reject the notification");
      console.log(error.message);
    }
  };
  return (
    <button
      className="notification_btn_reject"
      value={notification.type}
      id={notification.sentBy}
      onClick={rejectNotificationClickHandler}
    >
      Reject
    </button>
  );
}

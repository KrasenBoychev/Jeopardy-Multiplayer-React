import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSendFriendResMutation } from "../../game/01. play_page/friends_list/friendsApiSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { useGetNotificationsQuery } from "../notificationsApiSlice";

export default function RejectNotification({ notification }) {
  const dispatch = useDispatch();
  const [sendFriendRes, { isLoading }] = useSendFriendResMutation();
  const { refetch } = useGetNotificationsQuery("getNotifications");

  const rejectNotificationClickHandler = async () => {
    const friendUsername = notification.sentBy;
    const notificationType = notification.type;

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

      refetch();
    } catch (error) {
      toast.error("Cannot reject the notification");
      console.log(error.message);
    }
  };
  return (
    <button
      className="text-[13px] px-2 py-1 bg-destructive text-white rounded-lg cursor-pointer hover:text-black"
      onClick={rejectNotificationClickHandler}
      disabled={isLoading ? true : false}
    >
      Reject
    </button>
  );
}

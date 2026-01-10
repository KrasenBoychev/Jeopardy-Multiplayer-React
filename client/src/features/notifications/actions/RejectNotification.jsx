import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSendFriendResMutation } from "../../game/01. play_page/friends_list/friendsApiSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { useGetNotificationsQuery } from "../notificationsApiSlice";
import { selectActiveFriends } from "../../game/gameSlice";

export default function RejectNotification({ notification }) {
  const activeFriends = useSelector(selectActiveFriends);
  const dispatch = useDispatch();
  const [sendFriendRes, { isLoading }] = useSendFriendResMutation();
  const { refetch } = useGetNotificationsQuery("getNotifications");

  const rejectNotificationClickHandler = async () => {
    const friendUsername = notification.sentBy;
    const notificationType = notification.type;

    try {
      if (notificationType == "addFriendReq") {
        await sendFriendRes({
          friendUsername,
          response: "rejected",
        });

        const findPlayer = activeFriends.find(
          (friend) => friend[1].username == friendUsername
        );

        if (findPlayer && findPlayer[1].status == "Online") {
          dispatch(
            setSocketReq({
              socketReqName: "set_update_notifications",
              socketData: {
                receiverSocketId: findPlayer[0],
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
      className="text-[13px] px-2 py-1 bg-destructive text-white rounded-lg cursor-pointer hover:text-black max-[1800px]:text-[11px] max-1600px:text-[9px] max-1400px:text-[7px]"
      onClick={rejectNotificationClickHandler}
      disabled={isLoading ? true : false}
    >
      Reject
    </button>
  );
}

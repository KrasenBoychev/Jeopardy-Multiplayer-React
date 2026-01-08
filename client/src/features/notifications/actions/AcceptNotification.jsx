import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetFriendsListQuery,
  useSendFriendResMutation,
} from "../../game/01. play_page/friends_list/friendsApiSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { useGetNotificationsQuery } from "../notificationsApiSlice";
import { selectPlayers } from "../../game/gameSlice";

export default function AcceptNotification({ notification }) {
  const players = useSelector(selectPlayers);
  const dispatch = useDispatch();
  const [sendFriendRes, { isLoading }] = useSendFriendResMutation();
  const { refetch: refetchNotifications } =
    useGetNotificationsQuery("getNotifications");
  const { refetch: refetchFriendsList } =
    useGetFriendsListQuery("getFriendsList");

  const acceptNotificationClickHandler = async () => {
    const friendUsername = notification.sentBy;
    const notificationType = notification.type;

    try {
      if (notificationType == "addFriendReq") {
        await sendFriendRes({
          friendUsername,
          response: "accepted",
        });

        const findPlayer = players.find(
          (player) => player[1].username == friendUsername
        );

        if (findPlayer && findPlayer[1].status == "Online") {
          dispatch(
            setSocketReq({
              socketReqName: "setFriendReqAccepted",
              socketData: {
                receiverSocketId: findPlayer[0],
              },
            })
          );
        }

        refetchFriendsList();
        refetchNotifications();
      }
    } catch (error) {
      toast.error("Cannot accept the notification");
      console.log(error.message);
    }
  };

  return (
    <button
      className="text-[13px] px-2 py-1 bg-green-500 text-white rounded-lg cursor-pointer hover:text-black"
      onClick={acceptNotificationClickHandler}
      disabled={isLoading ? true : false}
    >
      Accept
    </button>
  );
}

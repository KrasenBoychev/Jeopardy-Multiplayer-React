import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { selectCurrentUser } from "../../../authentication/authSlice";
import {
  useGetFriendsListQuery,
  useSendFriendReqMutation,
} from "./friendsApiSlice";
import { useGetNotificationsQuery } from "../../../notifications/notificationsApiSlice";
import { setSocketReq } from "../../../socket_connection/socketSlice";
import { selectPlayers } from "../../gameSlice";

export default function AddFriendBtn() {
  const [addFriendUsername, setAddFriendUsername] = useState("");
  const user = useSelector(selectCurrentUser);
  const players = useSelector(selectPlayers);
  const { data: friendsList } = useGetFriendsListQuery("getFriendsList");
  const { data: notifications } = useGetNotificationsQuery("getNotifications");
  const [sendFriendReq, { isLoading }] = useSendFriendReqMutation();
  const dispatch = useDispatch();

  const sendFriendInvitation = async () => {
    if (!addFriendUsername.trim()) {
      return;
    } else if (addFriendUsername == user.username) {
      toast.error("Cannot add yourself");
      return;
    } else if (addFriendUsername == "admin") {
      toast.error(addFriendUsername + " does not exist");
      return;
    }

    if (friendsList.length > 0) {
      const findFriend = friendsList.find(
        (friend) => friend == addFriendUsername
      );
      if (findFriend) {
        toast.error(addFriendUsername + " is in your Friends List");
        return;
      }
    }

    const findNotification = notifications.find(
      (notification) =>
        notification.type == "addFriendReq" &&
        notification.username == addFriendUsername
    );
    if (findNotification) {
      toast.error(
        addFriendUsername +
          " has already sent friend request to you - check notifications"
      );
      return;
    }

    try {
      const response = await sendFriendReq(addFriendUsername);
      const result = response.data;

      if (result.status == "error") {
        toast.error(result.msg);
      } else if (result.status == "success") {
        const findPlayer = players.find(
          (player) => player[1].username == addFriendUsername
        );

        if (findPlayer) {
          dispatch(
            setSocketReq({
              socketReqName: "setUpdateNotifications",
              socketData: { receiverSocketId: findPlayer[0] },
            })
          );
        }

        toast.success("Friend request sent to " + addFriendUsername);
        setAddFriendUsername("");
      }
    } catch (error) {
      toast.error("Sending friend request failed");
      console.log(error.message);
    }
  };

  return (
    <div className="flex gap-2 pt-2.5 border-t-[1px] border-t-chart-2">
      <input
        className="w-[180px] px-1"
        type="text"
        placeholder="Type username..."
        value={addFriendUsername}
        onChange={(event) => {
          setAddFriendUsername(event.target.value);
        }}
      />
      <button
        className="flex-1 bg-chart-2 rounded-md py-[2px] px-[4px] text-[12px] uppercase cursor-pointer hover:text-black"
        onClick={sendFriendInvitation}
        disabled={isLoading ? true : false}
      >
        add friend
      </button>
    </div>
  );
}

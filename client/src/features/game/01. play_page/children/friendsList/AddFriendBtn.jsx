import { toast } from "react-hot-toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../authentication/authSlice";
import { selectFriends } from "./friendsSlice";
import { useSendFriendReqMutation } from "./friendsApiSlice";
import { useGetNotificationsQuery } from "../../../../../components/notifications/notificationsApiSlice";
import { setSocketReq } from "../../../../socket_connection/socketSlice";

export default function AddFriendBtn() {
  const [addFriendUsername, setAddFriendUsername] = useState("");
  const user = useSelector(selectCurrentUser);
  const friends = useSelector(selectFriends);
  const [sendFriendReq] = useSendFriendReqMutation();
  const { data: notifications } = useGetNotificationsQuery("getNotifications");
  const dispatch = useDispatch();

  const sendFriendInvitation = async () => {
    if (!addFriendUsername.trim()) {
      return;
    } else if (addFriendUsername == user.username) {
      toast.error("Cannot add yourself");
      return;
    }

    if (friends) {
      const findFriend = friends.find(
        (friend) => friend.username == addFriendUsername
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
        dispatch(
          setSocketReq({
            socketReqName: "friendReqSent",
            socketData: { receiverSocketId: result.friendSocketId },
          })
        );

        toast.success("Friend request sent to " + addFriendUsername);
        setAddFriendUsername("");
      }
    } catch (error) {
      toast.error("Sending friend request failed");
      console.log(error.message);
    }
  };

  return (
    <p className="add_friend">
      <input
        type="text"
        placeholder="Friend Username"
        value={addFriendUsername}
        onChange={(event) => {
          setAddFriendUsername(event.target.value);
        }}
      />
      <button onClick={sendFriendInvitation}>Add Friend</button>
    </p>
  );
}

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFriendStatus } from "../../game/01. play_page/children/friendsList/friendsSlice";
import toast from "react-hot-toast";

export default function useFriends(socket) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("getFriendStatus", ({ senderInfo }) => {
      dispatch(updateFriendStatus(senderInfo));
    });

    socket?.on("friendReqReceived", () => {
      toast.success("new friend request received");
    });
  }, [socket]);
}

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useFriendsStatus(socket) {
  useEffect(() => {
    socket?.on("getFriendStatus", ({ senderInfo }) => {
      toast.success(senderInfo.username + "yesss");
    });
  }, []);
}

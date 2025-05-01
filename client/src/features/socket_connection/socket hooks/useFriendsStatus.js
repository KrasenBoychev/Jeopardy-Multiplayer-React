import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFriendStatus } from "../../game/01. play_page/children/friendsList/friendsSlice";

export default function useFriendsStatus(socket) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("getFriendStatus", ({ senderInfo }) => {    
      dispatch(updateFriendStatus(senderInfo));
    });
  }, [socket]);
}

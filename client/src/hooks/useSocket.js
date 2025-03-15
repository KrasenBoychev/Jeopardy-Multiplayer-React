import { useEffect } from "react";
import { io } from "socket.io-client";
import { getFriendsOnline } from "../../api/user-api";
import { useAuthContext } from "../contexts/AuthContext";

export default function useSocket(socket, setSocket, setFriendsList) {
  const { isAuthenticated, username } = useAuthContext();

  useEffect(() => {
    (async function socketService() {
      if (isAuthenticated) {
        const createSocket = io("http://localhost:5000");
        const action = "";
        await getFriends(createSocket, setFriendsList, username, action);
        setSocket(createSocket);
      }
    })();
  }, [isAuthenticated]);

  useEffect(() => {
    socket?.emit("newUser", username);

    socket?.on("getFriendStatus", ({ senderInfo, action }) => {
      setFriendsList((prevFriendList) => {
        const newUpdatedFriendsLst = prevFriendList.filter(
          (friend) => friend.username !== senderInfo.username
        );
        if (action == "") {
          newUpdatedFriendsLst.push({
            username: senderInfo.username,
            online: true,
            socketId: senderInfo.socketId,
          });
        } else if (action == "logout") {
          newUpdatedFriendsLst.push({
            username: senderInfo.username,
            online: false,
          });
        } else if (action == "changeToGameInProgress") {
          newUpdatedFriendsLst.push({
            username: senderInfo.username,
            gameInProgress: 'gameInPrgress',
            socketId: senderInfo.socketId,
          });
        }

        return newUpdatedFriendsLst;
      });
    });
  }, [socket]);
}

export async function getFriends(
  socket,
  setFriendsList,
  username,
  action,
  friendsList
) {
  let allFriends = friendsList;

  if (action == '') {
    allFriends = await getFriendsOnline();
    setFriendsList(allFriends);
  }

  const onlineFriends = allFriends.filter((friend) => friend.online == true);
  if (onlineFriends.length > 0) {
    await socket.emit("sendUserStatus", {
      senderInfo: { username, socketId: socket.id },
      receiverFriends: onlineFriends,
      action,
    });
  }
}

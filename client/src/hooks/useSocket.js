import { useEffect } from "react";
import { io } from "socket.io-client";
import { getFriendsOnline } from "../../api/requester";
import { useAuthContext } from "../contexts/AuthContext";

export default function useSocket(socket, setSocket, setFriendsList) {
  const { isAuthenticated, userId, username } = useAuthContext();

    useEffect(() => {
        (async function socketService() {
          if (isAuthenticated) {
            const createSocket = io("http://localhost:5000");
            const logout = false;
            await getFriends(createSocket, setFriendsList, userId, username, logout);
            setSocket(createSocket);
          }
        })();
      }, [isAuthenticated]);
    
      useEffect(() => {
        socket?.emit("newUser", username);
    
        socket?.on("getFriendStatus", ({ senderInfo, logout }) => {
          setFriendsList((prevFriendList) => {
            const newUpdatedFriendsLst = prevFriendList.filter((friend) => friend.username !== senderInfo.username);
            if (!logout) {
              newUpdatedFriendsLst.push({ username: senderInfo.username, online: true, socketId: senderInfo.socketId });
            } else {
              newUpdatedFriendsLst.push({ username: senderInfo.username, online: false});
            }
            return newUpdatedFriendsLst;
          });
        });
      }, [socket]);
}

export async function getFriends(socket, setFriendsList, userId, username, logout, friendsList) {
    let allFriends = friendsList;
  
    if (!logout) {
      allFriends = await getFriendsOnline(userId);
      setFriendsList(allFriends);
    }
  
    const onlineFriends = allFriends.filter((friend) => friend.online == true);
    if (onlineFriends.length > 0) {
      await socket.emit("sendUserStatus", {
        senderInfo: { username, socketId: socket.id },
        receiverFriends: onlineFriends,
        logout
      });
    }
  }
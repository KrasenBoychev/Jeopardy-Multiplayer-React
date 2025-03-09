import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "../../contexts/AuthContext";
import { getFriendsOnline } from "../../../api/requester";
import useSocket from "../../hooks/useSocket";

export default function Socket(props) {
  const { socket, setSocket } = props.socketProps;
  const { friendsList, setFriendsList } = props.friendsProps;

  useSocket(socket, setSocket, setFriendsList);
  return;
}

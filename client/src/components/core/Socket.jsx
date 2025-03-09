import useSocket from "../../hooks/useSocket";

export default function Socket(props) {
  const { socket, setSocket } = props.socketProps;
  const { friendsList, setFriendsList } = props.friendsProps;

  useSocket(socket, setSocket, setFriendsList);
  return;
}

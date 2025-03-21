import useSocket from "../../hooks/useSocket";

export default function Socket(props) {
  const { socket, setSocket } = props.socketProps;
  const { friendsList, setFriendsList } = props.friendsProps;
  const { setNotificationsList } = props.setNotificationsList;

  useSocket(socket, setSocket, setFriendsList, setNotificationsList);
  return;
}

import useNewGameStarted from "../../hooks/useNewGameStarted";
import useSocket from "../../hooks/useSocket";

export default function Socket(props) {
  const { socket, setSocket } = props.socketProps;
  const { friendsList, setFriendsList } = props.friendsProps;
  const { setNotificationsList } = props.setNotificationsList;
  const { isNewGameStarted, setIsNewGameStarted } = props.newGameStartedProps;
  const friendInvited = props.friendInvited;

  useSocket(socket, setSocket, setFriendsList, setNotificationsList);
  useNewGameStarted(socket, friendsList, friendInvited, isNewGameStarted);
  return;
}

import useNewGameStarted from "../../hooks/game_hooks/useNewGameStarted";
import useSocket from "../../hooks/useSocket";

export default function Socket(props) {
  const { socket, setSocket } = props.socketProps;
  const { friendsList, setFriendsList } = props.friendsProps;
  const { setNotificationsList } = props.setNotificationsList;
  const { isNewGameStarted } = props.newGameStartedProps;

  useSocket(socket, setSocket, setFriendsList, setNotificationsList);
  useNewGameStarted(socket, friendsList, isNewGameStarted);
  return;
}

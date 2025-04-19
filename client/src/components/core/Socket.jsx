import useNewGameStarted from "../../hooks/game_hooks/useNewGameStarted";
import useSocket from "../../hooks/useSocket";

import { useSelector, useDispatch } from "react-redux";
import { createSocket } from "../../slices/socketSlice";

export default function Socket(props) {
  // const { socket, setSocket } = props.socketProps;
  const { friendsList, setFriendsList } = props.friendsProps;
  const { setNotificationsList } = props.setNotificationsList;
  const { isNewGameStarted } = props.newGameStartedProps;

  const socket = useSelector((state) => state.socket.socketInfo);
  // const dispatch = useDispatch();

  // dispatch(createSocket());
  console.log(socket);

  // const socketStatus = useSelector(getSocketStatus);
  // const error = useSelector(getSocketError);

  // if (socketStatus === "loading") {
  //   console.log("socket loading");
  // } else if (socketStatus === "succeeded") {
  //   console.log(socket);
  //   // createSocket.emit("newUser");

  // } else if (socketStatus === "failed") {
  //   console.log(error);
  // }

  // useSocket(socket, setSocket, setFriendsList, setNotificationsList);
  // useNewGameStarted(socket, friendsList, isNewGameStarted);
  return;
}

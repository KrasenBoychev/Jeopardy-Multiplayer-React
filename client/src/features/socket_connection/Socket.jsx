import useConnection from "./socket hooks/useConnection";
import useFriendsStatus from "./socket hooks/useFriendsStatus";

export default function Socket({ socketProps }) {
  const { socket } = socketProps;

  useConnection(socketProps);
  useFriendsStatus(socket);
  return;
}
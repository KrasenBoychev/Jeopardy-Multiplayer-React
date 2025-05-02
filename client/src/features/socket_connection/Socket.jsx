import useConnection from "./socket hooks/useConnection";
import useFriends from "./socket hooks/useFriends";
import useSendSocketReq from "./socket hooks/useSendSocketReq";

export default function Socket({ socketProps }) {
  const { socket } = socketProps;

  useConnection(socketProps);
  useFriends(socket);

  useSendSocketReq(socket);
  return;
}

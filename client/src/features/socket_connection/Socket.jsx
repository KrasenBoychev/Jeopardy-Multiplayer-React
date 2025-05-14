import useConnection from "./socket hooks/useConnection";
import useGameListeners from "./socket hooks/useGameListeners";
import useListeners from "./socket hooks/useListeners";
import useSendSocketReq from "./socket hooks/useSendSocketReq";

export default function Socket({ socketProps }) {
  const { socket } = socketProps;

  useConnection(socketProps);
  useListeners(socket);
  useGameListeners(socket);
  useSendSocketReq(socket);
  return;
}

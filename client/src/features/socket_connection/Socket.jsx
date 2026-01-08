import { useEffect } from "react";
import useGameListeners from "./socket hooks/useGameListeners";
import useListeners from "./socket hooks/useListeners";
import useSendSocketReq from "./socket hooks/useSendSocketReq";
import { useDispatch, useSelector } from "react-redux";
import { deleteSocketReqDetails } from "./socketSlice";
import { io } from "socket.io-client";
import { baseURL } from "../../app/api/baseURL";
import { selectCurrentUser } from "../authentication/authSlice";
import { selectPlayers, setPlayers } from "../game/gameSlice";

export default function Socket({ socketProps }) {
  const { socket, setSocket } = socketProps;
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io(baseURL);
    setSocket(newSocket);

    newSocket.emit("identify", user.username);
    newSocket.on("user_list_update", (allPlayers) => {
      dispatch(setPlayers(allPlayers));
    });

    return () => {
      newSocket.off("user_list_update");
      dispatch(deleteSocketReqDetails());
      try {
        newSocket.removeAllListeners();
        newSocket.disconnect();
      } catch (e) {
        // ignore errors during cleanup
      }
    };
  }, []);

  useListeners(socket);
  useGameListeners(socket);
  useSendSocketReq(socket);
  return null;
}

import { useSelector } from "react-redux";
import { selectSocketData, selectSocketReqName } from "../socketSlice";
import { useEffect } from "react";

export default function useSendSocketReq(socket) {
  const socketReqName = useSelector(selectSocketReqName);
  const socketData = useSelector(selectSocketData);

  useEffect(() => {
    if (socketReqName && socket && typeof socket.emit === "function") {
      try {
        socket.emit(socketReqName, socketData);
      } catch (e) {
        // ignore emit errors
      }
    }
  }, [socketReqName, socketData, socket]);
}

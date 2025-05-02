import { useSelector } from "react-redux";
import { selectSocketData, selectSocketReqName } from "../socketSlice";
import { useEffect } from "react";

export default function useSendSocketReq(socket) {
  const socketReqName = useSelector(selectSocketReqName);
  const socketData = useSelector(selectSocketData);

  useEffect(() => {
    if (socketReqName) {
      (async () => {
        await socket.emit(socketReqName, socketData);
      })();
    }
  }, [socketReqName, socketData]);
}

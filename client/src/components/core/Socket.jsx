import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Socket({ socketProps }) {
  const { socket, setSocket } = socketProps;

  const { isAuthenticated, username } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      setSocket(io("http://localhost:5000"));
    } else if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    socket?.emit("newUser", username);
  }, [socket]);

  return;
}

import { io } from "socket.io-client";
import { baseURL } from "../../app/api/baseURL";
import { useState } from "react";

import useConnection from "./socket hooks/useConnection";
import useFriendsStatus from "./socket hooks/useFriendsStatus";

export default function Socket() {
  const [socket, setSocket] = useState(io(baseURL));

  useConnection(socket);
  useFriendsStatus(socket);
  return;
}

import { useEffect, useState } from "react";

import { StreamChat } from "stream-chat";

export default function useJoinGame(userId, username, gameToken) {
  const api_key = "juudbb2ng7uh";
  const client = StreamChat.getInstance(api_key);

  useEffect(() => {
    client.connectUser(
      {
        id: userId,
        username,
      },
      gameToken
    );
  });

  return client;
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { StreamChat } from "stream-chat";

import { getGameToken } from "../../api/game-api";
import toast from "react-hot-toast";

export default function usePlay(username) {
  const navigate = useNavigate();

  const api_key = "tswxm74zz6uc";
  const client = StreamChat.getInstance(api_key);

  useEffect(() => {
    let active = true;
    load();

    return () => {
      active = false;
      client.disconnectUser();
    };

    async function load() {
      try {
        const { token, userId } = await getGameToken(username);

        client
          .connectUser(
            {
              id: userId,
              name: username,
            },
            token
          );

        if (!active) {
          return;
        }
      } catch (error) {
        toast.error('Can not play at this moment. Please send a message to our customer service team.');
        navigate('/');
      }
    }
  }, []);

  return client;
}

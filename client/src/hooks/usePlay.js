import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getGameToken } from "../../api/game-api";
import toast from "react-hot-toast";

export default function usePlay(username, setIsAuth, client) {
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    load();

    return () => {
      active = false;
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
          )
          .then((user) => {
            setIsAuth(true);
          });

        if (!active) {
          return;
        }
      } catch (error) {
        toast.error('Can not play at this moment. Please send a message to our customer service team.');
        navigate('/');
      }
    }
  }, []);
}

import { useEffect } from "react";

import { getGameToken } from "../../api/game-api";

export default function usePlay(username, setIsAuth, client) {
  useEffect(() => {
    let active = true;
    load();

    return () => {
      active = false;
    };

    async function load() {
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
    }
  }, []);
}

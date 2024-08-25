import { useEffect, useState } from "react";

export default function useStartingPlayer(channel) {
  const [counter, setCounter] = useState(3);
  const [firstPlayer, setFirstPlayer] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");

  const timer = setTimeout(() => {
    if (counter <= 1) {
      clearTimeout(timer);
    } else {
      setCounter((oldCount) => oldCount - 1);
    }
  }, 1000);

 

  useEffect(() => {
    (async function setPlayer() {
      if (counter == 1) {
        const members = Object.entries(channel.state.members);
        const firstPlayerName = members[0][1].user.name;
        const secondPlayerName = members[1][1].user.name;

        const playersNames = [firstPlayerName, secondPlayerName];

        const startingPlayer =
          playersNames[Math.floor(Math.random() * playersNames.length)];

        const indexOfStartingPlayer = playersNames.indexOf(startingPlayer);
        playersNames.splice(indexOfStartingPlayer, 1)
        const otherPlayer = playersNames[0];

        await channel.sendEvent({
          type: "set-first-player",
          data: { startingPlayer, otherPlayer },
        });
      }
    })();
  }, [counter]);

  channel.on((event) => {
    if (event.type == "set-first-player") {
      setFirstPlayer(event.data.startingPlayer);
      setSecondPlayer(event.data.otherPlayer);
    }
  });

  return [counter, firstPlayer, secondPlayer];
}

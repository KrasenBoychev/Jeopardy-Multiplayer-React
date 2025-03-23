import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGameContext } from "../../../contexts/GameContext";
// import ConnectPlayers from "../startGame/connectPlayers/ConnectPlayers";
// import JoinGame from "../startGame/joinGame/JoinGame";

import "../exitGame/confirm/confirm.css";
import "./resultGame.css";

export default function ResultGame({ props }) {
  const { firstPlayer, secondPlayer, pointsFirstPlayer, pointsSecondPlayer } =
    props;

  const {
    channel,
    setChannel,
    client,
    rivalPlayer,
    isNewGameStarted,
    setIsNewGameStarted,
  } = useGameContext();

  const [newGameWithSamePlayer, setNewGameWithSamePlayer] = useState(false);
  const [newGameWithOtherPlayer, setNewGameWithOtherPlayer] = useState(false);
  const [newGameMsg, setNewGameMsg] = useState(false);
  const [playerReceivingMsg, setPlayerReceivingMsg] = useState("");
  const [playerShowingNotification, setPlayerShowingNotification] =
    useState("");

  useEffect(() => {
    (function showMsg() {
      if (client.user.name === playerReceivingMsg) {
        setNewGameMsg(true);
        setPlayerReceivingMsg("");
      } else if (playerReceivingMsg !== "") {
        toast.success(`Invataion sent to ${rivalPlayer}!`);
        setPlayerReceivingMsg("");
      }

      if (client.user.name === playerShowingNotification) {
        toast.error(`${rivalPlayer} rejected the invatation`);
        setPlayerShowingNotification("");
      } else if (playerShowingNotification !== "") {
        setNewGameMsg(false);
        setPlayerShowingNotification("");
      }
    })();
  }, [playerReceivingMsg, playerShowingNotification]);

  const playWithOtherFriendClickHandler = async () => {
    // await disconnectUser(
    //   channel,
    //   setChannel,
    //   null,
    //   setIsNewGameStarted,
    //   null,
    //   null
    // );

    setNewGameWithOtherPlayer(true);
  };

  const playWithSameFriendClickHandler = async () => {
    await channel.sendEvent({
      type: "new-game-msg",
      data: { rivalPlayer },
    });
  };

  const startNewGameFalse = async () => {
    setNewGameMsg(false);

    await channel.sendEvent({
      type: "new-game-rejection",
      data: { rivalPlayer },
    });
  };

  const startNewGameTrue = async () => {
    await channel.sendEvent({
      type: "start-new-game",
    });
  };

  channel.on((event) => {
    if (event.type == "new-game-msg") {
      setPlayerReceivingMsg(event.data.rivalPlayer);
    }

    if (event.type == "start-new-game") {
      setNewGameWithSamePlayer(true);
    }

    if (event.type == "new-game-rejection") {
      setPlayerShowingNotification(event.data.rivalPlayer);
    }
  });

  return (
    <>
      {/* {newGameWithSamePlayer && <ConnectPlayers />}

      {newGameWithOtherPlayer && (
        <JoinGame game={{ isNewGameStarted, setIsNewGameStarted }} />
      )} */}

      {!newGameWithSamePlayer && !newGameWithOtherPlayer && (
        <div className="result-game-container">
          <p className="result-winner answer-correct">
            {pointsFirstPlayer == pointsSecondPlayer
              ? `${firstPlayer} and ${secondPlayer} share the first place!`
              : pointsFirstPlayer > pointsSecondPlayer
              ? `Congratulations ${firstPlayer}!`
              : `Congratulations ${secondPlayer}!`}
          </p>
          <div className="final-result">
            <p>Final Result</p>
            <p className="final-players">
              <span className="final-first-player">
                <span>{firstPlayer}:</span>
                <span>{pointsFirstPlayer} points</span>
              </span>
              <span className="final-vs">VS</span>
              <span className="final-second-player">
                <span>{secondPlayer}:</span>
                <span>{pointsSecondPlayer} points</span>
              </span>
            </p>
          </div>
          <div className="result-play-again">
            <button onClick={playWithSameFriendClickHandler}>
              Play another game with {rivalPlayer}
            </button>

            <button onClick={playWithOtherFriendClickHandler}>
              Play with other friend
            </button>
          </div>
          {newGameMsg && (
            <div className="confirm-wrapper">
              <div className="confirm-message">
                <h2>Do you want to start a new game with {rivalPlayer}?</h2>
                <div className="confirm-buttons">
                  <button onClick={startNewGameTrue}>Yes</button>
                  <button onClick={startNewGameFalse}>No</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

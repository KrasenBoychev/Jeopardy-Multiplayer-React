import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGameContext } from "../../../contexts/GameContext";
import { disconnectUser } from "../../../hooks/useLeaveGame";
import ConnectPlayers from "../startGame/connectPlayers/ConnectPlayers";
import "./resultGame.css";

export default function ResultGame({ props }) {
  const { firstPlayer, secondPlayer, pointsFirstPlayer, pointsSecondPlayer } =
    props;

  const { channel, setChannel, client, setIsNewGameStarted, rivalPlayer } =
    useGameContext();
  const navigate = useNavigate();

  const [newGame, setNewGame] = useState(false);
  const [newGameMsg, setNewGameMsg] = useState(false);
  const [playerReceivingMsg, setPlayerReceivingMsg] = useState("");

  useEffect(() => {
    (function showMsg() {
      if (client.user.name === playerReceivingMsg) {
        setNewGameMsg(true);
      } else {
        toast.success(`Invataion sent to ${rivalPlayer}!`);
      }
    })();
  }, [playerReceivingMsg]);

  const playWithAnotherFriendClickHandler = () => {
    disconnectUser(
      channel,
      setChannel,
      client,
      setIsNewGameStarted,
      navigate,
      "/play"
    );
  };

  const playWithSameFriendClickHandler = async () => {
    await channel.sendEvent({
      type: "new-game-msg",
      data: { rivalPlayer },
    });
  };

  const startNewGameFalse = async () => {
    setNewGameMsg(false);

    // await channel.sendEvent({
    //   type: "new-game-rejection",
    //   data: { rivalPlayer },
    // });
  };

  const startNewGameTrue = async () => {
    await channel.sendEvent({
      type: "start-new-game",
    });

    setNewGame(true);
  };

  channel.on((event) => {
    if (event.type == "new-game-msg") {
      setPlayerReceivingMsg(event.data.rivalPlayer);
    }

    if (event.type == "start-new-game") {
      setNewGame(true);
    }
  });

  return (
    <>
      {newGame ? (
        <ConnectPlayers />
      ) : (
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

            <button onClick={playWithAnotherFriendClickHandler}>
              Play with another friend
            </button>
          </div>
          {newGameMsg && (
            <div className="new-game-msg-container">
              <p>Do you want to start a new game with {rivalPlayer}?</p>
              <div>
                <button onClick={startNewGameTrue}>Yes</button>
                <button onClick={startNewGameFalse}>No</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

import { useGameContext } from "../../../contexts/GameContext";
import "./resultGame.css";

export default function ResultGame({ props }) {
  const { pointsFirstPlayer, pointsSecondPlayer } = props;

  const { firstPlayerUsername, secondPlayerUsername } = useGameContext();

  return (
    <>
      <div className="result_game_container">
        <p className="result_winner answer_correct">
          {pointsFirstPlayer == pointsSecondPlayer
            ? `${firstPlayerUsername} and ${secondPlayerUsername} share the first place!`
            : pointsFirstPlayer > pointsSecondPlayer
            ? `Congratulations ${firstPlayerUsername}!`
            : `Congratulations ${secondPlayerUsername}!`}
        </p>
        <div className="final_result">
          <p>Final Result</p>
          <p className="final_players">
            <span className="final_first_player">
              <span>{firstPlayerUsername}:</span>
              <span>{pointsFirstPlayer} points</span>
            </span>
            <span className="final_vs">VS</span>
            <span className="final_second_player">
              <span>{secondPlayerUsername}:</span>
              <span>{pointsSecondPlayer} points</span>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

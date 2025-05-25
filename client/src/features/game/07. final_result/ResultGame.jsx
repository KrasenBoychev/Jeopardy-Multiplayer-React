import { useSelector } from "react-redux";
import "./resultGame.css";
import { selectFirstPlayer, selectSecondPlayer } from "../playersSlice";

export default function ResultGame() {
  const firstPlayer = useSelector(selectFirstPlayer);
  const secondPlayer = useSelector(selectSecondPlayer);

  return (
    <>
      <div className="result_game_container">
        <p className="result_winner answer_correct">
          {firstPlayer.earnedPoints == secondPlayer.earnedPoints
            ? `${firstPlayer.username} and ${secondPlayer.username} share the first place!`
            : firstPlayer.earnedPoints > secondPlayer.earnedPoints
            ? `Congratulations ${firstPlayer.username}!`
            : `Congratulations ${secondPlayer.username}!`}
        </p>
        <div className="final_result">
          <p>Final Result</p>
          <p className="final_players">
            <span className="final_first_player">
              <span>{firstPlayer.username}:</span>
              <span>{firstPlayer.earnedPoints} points</span>
            </span>
            <span className="final_vs">VS</span>
            <span className="final_second_player">
              <span>{secondPlayer.username}:</span>
              <span>{secondPlayer.earnedPoints} points</span>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

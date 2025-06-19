import { useSelector } from "react-redux";
import { selectFirstPlayer, selectSecondPlayer } from "../playersSlice";
import "../game.css";

export default function Score() {
  const firstPlayer = useSelector(selectFirstPlayer);
  const secondPlayer = useSelector(selectSecondPlayer);

  return (
    <section>
      <div className="players_points_wrapper">
        <h3>Score</h3>
        <div className="players_points">
          <p className="points_first_player">
            <span>{firstPlayer.username}</span>
            <span>{firstPlayer.earnedPoints} points</span>
          </p>
          <p className="points_second_player">
            <span>{secondPlayer.username}</span>
            <span>{secondPlayer.earnedPoints} points</span>
          </p>
        </div>
      </div>
    </section>
  );
}

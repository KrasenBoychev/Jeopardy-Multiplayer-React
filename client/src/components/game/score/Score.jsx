import { useGameContext } from "../../../contexts/GameContext";

export default function Score({ points }) {
  const { firstPlayerUsername, secondPlayerUsername } = useGameContext();

  return (
    <section>
      <div className="players_points_wrapper">
        <h3>Score</h3>
        <div className="players_points">
          <p className="points_first_player">
            <span>{firstPlayerUsername}:</span>
            <span>{points.pointsFirstPlayer} points</span>
          </p>
          <p className="points_second_player">
            <span>{secondPlayerUsername}:</span>
            <span>{points.pointsSecondPlayer} points</span>
          </p>
        </div>
      </div>
    </section>
  );
}

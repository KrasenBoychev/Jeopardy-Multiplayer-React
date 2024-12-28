import "./resultGame.css";
export default function ResultGame({ props }) {
  const { firstPlayer, secondPlayer, pointsFirstPlayer, pointsSecondPlayer } =
    props;
  return (
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
    </div>
  );
}

import "./resultGame.css"
export default function ResultGame({ props }) {
  const { firstPlayer, secondPlayer, pointsFirstPlayer, pointsSecondPlayer } =
    props;
  return (
    <div className="gameContainer">
        <p className="result-winner answer-correct">
      {pointsFirstPlayer == pointsSecondPlayer
        ? `${firstPlayer} and ${secondPlayer} share the first place with ${pointsFirstPlayer} points!`
        : pointsFirstPlayer > pointsSecondPlayer
        ? `Winner: ${firstPlayer} with ${pointsFirstPlayer} points`
        : `Winner: ${secondPlayer} with ${pointsSecondPlayer} points`
       // : `${firstPlayer} and ${secondPlayer} share the first place with ${pointsFirstPlayer} points!`
      }
        </p>
    </div>
  );
}

import { Link } from "react-router-dom";

import "./home.css";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Home() {
  const { points } = useAuthContext();
  const data = ["test", "test", "test", "test", "test", "test"];

  return (
    <main>
      <div className="leaderboards">
        <div className="points-play">
          <p>Your Points: {points}</p>

          <Link to="/play">
            <button className="play-button">Play</button>
          </Link>
        </div>
        <div className="leaderboard-all-time">
          <p>Leaderboard All Time</p>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

import { getTopPlayers } from "../../../api/requester";

import "./home.css";

export default function Home() {
  const { points } = useAuthContext();

  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    (async function getPlayers() {
      const players = await getTopPlayers();
      setTopPlayers(players);
    })();
  }, [topPlayers]);

  return (
    <main>
      <div className="leaderboards">
        <div className="points-play">
          <p>{points != undefined ? `Your Points: ${points}` : "Play to win points!"}</p>

          <Link to="/play">
            <button className="play-button">Play</button>
          </Link>
        </div>
        <div className="leaderboard-all-time">
          <p>Leaderboard All Time</p>
          <ul>
            {topPlayers.map((player, index) => (
              <li key={player.username} className={index < 3 ? "leaderboard-all-time-player top-three" : "leaderboard-all-time-player"}>
                <span className="leaderboard-position">{index + 1}.</span>
                <span className="leaderboard-username">{player.username}</span>
                <span className="leaderboard-points">{player.points} points</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

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
      <div className="home-container">
        <section className="points-info-and-play-button">
          <p>
            {points != undefined
              ? `Your Points: ${points}`
              : "Win points and see your name in the Leaderboard!"}
          </p>
          <Link to="/play">
            <button className="play-button">
              &gt;&gt;&gt; Play &lt;&lt;&lt;
            </button>
          </Link>
        </section>
        <section className="leaderboard-all-time">
          <div className="leaderboard-wrapper">
            <p>Leaderboard All Time</p>
            <ul>
              {topPlayers.map((player, index) => (
                <li
                  key={player.username}
                  className={
                    index < 3
                      ? "leaderboard-all-time-player top-three"
                      : "leaderboard-all-time-player"
                  }
                >
                  <div className="leaderboard-player-info">
                    <span className="leaderboard-position">{index + 1}.</span>
                    <span className="leaderboard-username">
                      {player.username}
                    </span>
                  </div>
                  <span className="leaderboard-points">
                    {player.points} points
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

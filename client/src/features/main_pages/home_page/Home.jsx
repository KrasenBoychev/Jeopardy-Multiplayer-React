import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../authentication/authSlice";
import { useGetTopPlayersQuery } from "./homePageApiSlice";
import "./home.css";

export default function Home() {
  const user = useSelector(selectCurrentUser);

  const {
    data: topPlayers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTopPlayersQuery("getTopPlayers");

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <>
        <section className="points-info-and-play-button">
          <p>
            {user
              ? `Your Points: ${user.gameDetails.points}`
              : "Win points and see your name in the Leaderboard!"}
          </p>
          <Link to="/play">
            <button className="play-button">
              <span className="play-btn-arrows">&gt;&gt;&gt;</span> Play{" "}
              <span className="play-btn-arrows">&lt;&lt;&lt;</span>
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
                    {player.gameDetails.points} points
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <div className="home-container">{content}</div>;
}

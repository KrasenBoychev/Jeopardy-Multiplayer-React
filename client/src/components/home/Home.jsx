import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

import { getTopPlayers } from "../../../api/requester";

import "./home.css";
import toast from "react-hot-toast";

export default function Home({ socket }) {
  const { username, points } = useAuthContext();

  const [topPlayers, setTopPlayers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async function getPlayers() {
      const players = await getTopPlayers();
      setTopPlayers(players);
    })();
  }, []);

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendNotification = async () => {
    if (!socket) {
      toast.error(
        "Cannot send the invitation at the moment. Please logout and login again."
      );
      return;
    }

    await socket.emit("sendNotification", {
      senderName: username,
      receiverName: "mare",
    });
  };

  return (
    <div className="home-container">
      <section className="points-info-and-play-button">
        <p>
          {points != undefined
            ? `Your Points: ${points}`
            : "Win points and see your name in the Leaderboard!"}
        </p>
        <div>
          <button onClick={sendNotification}>Send Notification to Mare</button>
          <ul>
            {notifications.map((n, i) => (
              <li key={i}>{n.senderName}</li>
            ))}
          </ul>
        </div>
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
                  {player.points} points
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

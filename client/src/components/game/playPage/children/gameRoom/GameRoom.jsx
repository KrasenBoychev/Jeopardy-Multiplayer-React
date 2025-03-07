import "./gameRoom.css";

export default function GameRoom() {
  return (
    <div className="game_room_wrapper">
      <h3>Game Room</h3>
      <div className="game_room_players">
        <p>
          <span>Player 1:</span>
          <span>
            asdaaacadasdasdasdasdadasdasdasdasdadasdasdasdasdasdasdasd
          </span>
        </p>
        <p>
          <span>Player 2:</span>
          <span>
            asdaaacadasdasdasdasdadasdasdasdasdadasdasdasdasdasdasdasd
          </span>
        </p>
      </div>
      <button className="game_room_btn">Play</button>
    </div>
  );
}

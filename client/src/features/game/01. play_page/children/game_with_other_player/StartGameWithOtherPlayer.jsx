import "./startGameWithOtherPlayer.css";

export default function StartGameWithOtherPlayer() {
  return (
    <div className="start_game_other_player_wrapper">
      <h3>Invite player by typing their username</h3>
      <input
        className="start_game_rival_player"
        placeholder="Username of rival player..."
        onChange={(event) => {
          //   setRivalUsername(event.target.value);
        }}
      />
      <button className="start_game_button">Invite player</button>

      {/* <button className="start-game-button" onClick={createChannel}>
      Join/Start Game
      </button> */}
    </div>
  );
}

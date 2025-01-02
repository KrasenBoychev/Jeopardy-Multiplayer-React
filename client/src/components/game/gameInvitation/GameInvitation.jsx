import "./gameInvitation.css";

export default function GameInvitation(props) {
  const { setNewGameInvitation } = props.gameInvitation;

  const joinNewGameClickHandler = () => {
    setNewGameInvitation(true);
  }

  const rejectNewGameClickHandler = () => {
    setNewGameInvitation(false);
  }

  return (
    <div className="game-invitation-container">
      <h6>Game Invitation from someone</h6>
      <div>
        <button onClick={joinNewGameClickHandler}>Join</button>
        <button onClick={rejectNewGameClickHandler}>Reject</button>
      </div>
    </div>
  );
}

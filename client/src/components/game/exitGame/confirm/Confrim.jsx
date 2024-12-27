import "./confirm.css";

export default function Confrim({ props }) {
  const { confirmLeaving, declineLeaving } = props;

  return (
    <div className="confirm-wrapper">
      <div className="confirm-message">
        <h2>Are you sure you want to leave the game?</h2>
        <div className="confirm-buttons">
          <button onClick={confirmLeaving}>Yes</button>
          <button onClick={declineLeaving}>No</button>
        </div>
      </div>
    </div>
  );
}

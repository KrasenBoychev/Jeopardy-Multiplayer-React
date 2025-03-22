import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { getPlayersDetails } from "../../../../utils/gameUtils";
import { changeGameInProgress } from "../../../../hooks/useNewGameStarted";
import "./confirm.css";

export default function Confrim({ props }) {
  const {
    socket,
    friendsList,
    setShowConfirmMessage,
    setFriendInvited,
    gameRoomName,
    setGameRoomName,
    setRenderStartingPlayer,
    setIsNewGameStarted,
    firstPlayer,
    secondPlayer,
  } = props;
  const { username } = useAuthContext();
  const navigate = useNavigate();

  const confirmLeaving = async () => {
    const { friendUsernameDetails } = getPlayersDetails(
      username,
      firstPlayer,
      secondPlayer
    );

    await socket.emit("setExitGame", {
      receiverSocketId: friendUsernameDetails.socketId,
      userUsername: username,
      gameRoomName,
    });

    const gameInProgressValue = false;
    await changeGameInProgress(
      socket,
      friendsList,
      username,
      gameInProgressValue,
      navigate,
      null
    );

    setRenderStartingPlayer(false);
    setGameRoomName(null);
    setFriendInvited(null);
    setIsNewGameStarted(false);
    window.location.reload();
    navigate("/play");
  };

  const declineLeaving = () => {
    setShowConfirmMessage(false);
  };

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

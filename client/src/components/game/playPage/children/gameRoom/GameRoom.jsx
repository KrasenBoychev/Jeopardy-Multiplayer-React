import { useAuthContext } from "../../../../../contexts/AuthContext";
import InviteFriend from "./inviteFriend/InviteFriendBtn";
import "./gameRoom.css";

export default function GameRoom({ socket, friendProps }) {
  const { friendInvited, gameFriendResponse } = friendProps;
  const { username } = useAuthContext();

  return (
    <div className="game_room_wrapper">
      <h3>Game Room</h3>
      <div className="game_room_players">
        <p>
          <span>Player 1:</span>
          <span>{username}</span>
        </p>
        <p>
          <span>Player 2:</span>
          <span>
            {friendInvited ? (
              friendInvited
            ) : (
              <InviteFriend socket={socket} friendProps={friendProps} />
            )}

            {friendInvited && !gameFriendResponse && <button>'Cancel'</button>}
          </span>
        </p>
      </div>
      <p className="game_room_btn">
        {friendInvited &&
          !gameFriendResponse &&
          `Waiting for ${friendInvited} to respond`}
        {friendInvited && gameFriendResponse && "Loading Game"}
      </p>
    </div>
  );
}

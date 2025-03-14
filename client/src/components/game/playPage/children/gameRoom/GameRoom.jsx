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
        <div className="game_room_player_name">
          <p>{username}</p>
        </div>
        <div className="game_room_vs">
          <p>VS</p>
        </div>
        <div className="game_room_player_name">
          <p>
            {friendInvited ? (
              friendInvited
            ) : (
              <InviteFriend socket={socket} friendProps={friendProps} />
            )}

            {friendInvited && !gameFriendResponse && <button className="game_room_cancel_btn">Cancel</button>}
          </p>
        </div>
      </div>
      <p className="game_room_btn">
        {friendInvited &&
          !gameFriendResponse &&
          `Waiting for ${friendInvited} to respond...`}
        {friendInvited && gameFriendResponse && "Loading Game..."}
      </p>
    </div>
  );
}

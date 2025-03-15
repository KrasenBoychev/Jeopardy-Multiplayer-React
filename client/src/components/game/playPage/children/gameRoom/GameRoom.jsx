import { useAuthContext } from "../../../../../contexts/AuthContext";
import InviteFriend from "./inviteFriend/InviteFriendBtn";
import "./gameRoom.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function GameRoom({ socket, friendProps }) {
  const {
    friendsList,
    friendInvited,
    setFriendInvited,
    gameFriendResponse,
    setGameFriendResponse,
  } = friendProps;

  const { username } = useAuthContext();

  useEffect(() => {
    const findFriend = friendsList.find(
      (friend) => friend.username == friendInvited
    );

    if (findFriend && findFriend.online == false) {
      setFriendInvited(null);
      setGameFriendResponse(null);
      toast.error(findFriend.username + " left the game");
    }
  }, [friendsList]);

  const friendInvitedCancel = () => {
    setFriendInvited(null);
  };

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

            {friendInvited && !gameFriendResponse && (
              <button
                className="game_room_cancel_btn"
                onClick={friendInvitedCancel}
              >
                Cancel
              </button>
            )}

            {friendInvited &&
              gameFriendResponse == "gameInvitationReceived" && (
                <span className="game_room_group_btns">
                  <button
                  // onClick={friendInvitedCancel}
                  >
                    Play
                  </button>
                  <button
                  // onClick={friendInvitedCancel}
                  >
                    Cancel
                  </button>
                </span>
              )}
          </p>
        </div>
      </div>
      <p className="game_room_btn">
        {friendInvited &&
          !gameFriendResponse &&
          `Waiting for ${friendInvited} to respond...`}
        {friendInvited &&
          gameFriendResponse == "gameInvitationAccepted" &&
          "Loading Game..."}
      </p>
    </div>
  );
}

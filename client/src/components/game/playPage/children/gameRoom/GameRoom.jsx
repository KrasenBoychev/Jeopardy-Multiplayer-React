import { useAuthContext } from "../../../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CancelGameInvitation from "./buttons/CancelGameInvitation";
import InviteFriend from "./buttons/InviteFriendBtn";
import "./gameRoom.css";

export default function GameRoom({ socket, friendProps, notificationsList }) {
  const { friendsList, friendInvited, setFriendInvited, isNewGameStarted } =
    friendProps;

  const { username } = useAuthContext();

  useEffect(() => {
    (async function friendLogsOut() {
      const findFriend = friendsList.find(
        (friend) =>
          friend.username == friendInvited && friend.online == false
      );

      if (findFriend) {
        await socket.emit("leaveRoom", {
          userUsername: username,
          friendUsername: findFriend.username,
        });
        setFriendInvited(null);
        toast.error(findFriend.username + " left the game");
      }
    })();
  }, [friendsList]);

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
              <InviteFriend
                socket={socket}
                friendProps={{ friendsList, friendInvited, setFriendInvited }}
                notificationsList={notificationsList}
              />
            )}

            {friendInvited && !isNewGameStarted && (
              <CancelGameInvitation
                socket={socket}
                friendProps={{ friendsList, friendInvited, setFriendInvited }}
              />
            )}
          </p>
        </div>
      </div>
      <p className="game_room_btn">
        {friendInvited &&
          !isNewGameStarted &&
          `Waiting for ${friendInvited} to respond...`}
        {friendInvited && isNewGameStarted && "Loading Game..."}
      </p>
    </div>
  );
}

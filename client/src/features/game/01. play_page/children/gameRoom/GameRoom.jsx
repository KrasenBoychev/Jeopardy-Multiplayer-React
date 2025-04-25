import { useAuthContext } from "../../../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CancelGameInvitation from "./buttons/CancelGameInvitation";
import InviteFriend from "./buttons/InviteFriendBtn";
import "./gameRoom.css";

export default function GameRoom({ socket, friendProps, notificationsList }) {
  const {
    friendsList,
    friendInvited,
    setFriendInvited,
    isNewGameStarted,
    firstPlayer,
    secondPlayer,
  } = friendProps;

  const { username } = useAuthContext();

  useEffect(() => {
    (async function friendLogsOutOrInGame() {
      const findOfflineFriend = friendsList.find(
        (friend) => friend.username == friendInvited && friend.online == false
      );

      let findInGameFriend = null;

      if (!findOfflineFriend) {
        findInGameFriend = friendsList.find(
          (friend) =>
            friend.username == friendInvited &&
            friend.username != firstPlayer.username &&
            friend.username != secondPlayer.username
        );
      }

      if (findOfflineFriend) {
        setFriendInvited(null);
        toast.error(findOfflineFriend.username + " left the game");
      } else if (findInGameFriend) {
        setFriendInvited(null);
        toast.error(
          findInGameFriend.username + " started new game with other player"
        );
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

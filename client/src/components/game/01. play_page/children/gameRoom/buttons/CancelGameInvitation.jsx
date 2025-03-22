import { useAuthContext } from "../../../../../../contexts/AuthContext";

export default function CancelGameInvitation({ socket, friendProps }) {
  const { friendsList, friendInvited, setFriendInvited } = friendProps;
  const { username } = useAuthContext();

  const friendInvitedCancel = async () => {
    const findFriend = friendsList.find(
      (friend) => friend.username == friendInvited
    );

    if (findFriend && findFriend.online && !findFriend.gameInProgress) {
      await socket.emit("setCancelGameInvitation", {
        receiverSocketId: findFriend.socketId,
        userUsername: username,
      });
    }

    setFriendInvited(null);
  };

  return (
    <button className="game_room_cancel_btn" onClick={friendInvitedCancel}>
      Cancel
    </button>
  );
}

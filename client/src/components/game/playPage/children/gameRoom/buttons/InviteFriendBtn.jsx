import toast from "react-hot-toast";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import PopupComp from "../../../../../shared/popup/Popup";

export default function InviteFriend({
  socket,
  friendProps,
  notificationsList,
}) {
  const { friendsList, friendInvited, setFriendInvited } = friendProps;

  const { username } = useAuthContext();

  const inviteFriendToGameRoom = async (e) => {
    const friendUsername = e.target.id;

    const findGameInvitationFromFriend = notificationsList.find(
      (notification) =>
        notification.username == friendUsername &&
        notification.type == "gameInvitation"
    );

    if (findGameInvitationFromFriend) {
      toast.error(
        "Game invitation has already been sent from " +
          friendUsername +
          " -> check notifications"
      );
      return;
    }

    const findFriend = friendsList.find(
      (friend) => friend.username == friendUsername
    );

    if (findFriend && findFriend.online && !findFriend.gameInProgress) {
      await socket.emit("sendGameInvitation", {
        receiverSocketId: findFriend.socketId,
        userUsername: username,
        friendUsername,
      });

      setFriendInvited(friendUsername);
    } else {
      toast.error(
        `${friendUsername} is either offline or in game. Please refresh the page`
      );
    }
  };

  const openBtnName = "+";
  const popupHeading = "Friends Online";
  const popupContent = (
    <ul>
      {friendsList.map((friend) => {
        if (friend.online && !friend.gameInProgress) {
          return (
            <li
              key={friend.username}
              id={friend.username}
              onClick={inviteFriendToGameRoom}
            >
              {friend.username}
            </li>
          );
        }
      })}
    </ul>
  );

  return (
    <>
      {!friendInvited && (
        <PopupComp
          openBtnName={openBtnName}
          heading={popupHeading}
          content={popupContent}
        />
      )}
    </>
  );
}

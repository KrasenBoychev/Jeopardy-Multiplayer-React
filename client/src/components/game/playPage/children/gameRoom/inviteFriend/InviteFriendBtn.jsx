import toast from "react-hot-toast";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { updateGameInProgress } from "../../../../../../../api/user-api";
import PopupComp from "../../../../../shared/popup/Popup";
import "./inviteFriend.css";

export default function InviteFriend({ socket, friendProps }) {
  const { friendsList, friendInvited, setFriendInvited, gameFriendResponse } =
    friendProps;

  const { username } = useAuthContext();

  const inviteFriendToGameRoom = async (e) => {
    const friendUsername = e.target.id;
    const findFriend = friendsList.find(
      (friend) => friend.username == friendUsername
    );

    if (findFriend && findFriend.online && !findFriend.gameInProgress) {
      await updateGameInProgress();

      const receiverFriends = friendsList.filter(
        (friend) =>
          friend.username !== friendUsername &&
          friend.online &&
          !friend.gameInProgress
      );

      await socket.emit("sendUserStatus", {
        senderInfo: { username, gameInProgress: true },
        receiverFriends,
        action: "changeGameInProgress",
      });

      await socket.emit("sendGameInvitation", {
        receiverSocketId: findFriend.socketId,
        username,
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
      {!friendInvited && !gameFriendResponse && (
        <PopupComp
          openBtnName={openBtnName}
          heading={popupHeading}
          content={popupContent}
        />
      )}
    </>
  );
}

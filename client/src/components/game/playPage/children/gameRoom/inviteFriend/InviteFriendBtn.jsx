import { useEffect, useState } from "react";
import PopupComp from "../../../../../shared/popup/Popup";
import "./inviteFriend.css";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../../../../contexts/AuthContext";

export default function InviteFriend({ socket, friendProps }) {
  const { friendsList, friendInvited, setFriendInvited, gameFriendResponse } =
    friendProps;

  const { username } = useAuthContext();

  const inviteFriendToGameRoom = async (e) => {
    const friendUsername = e.target.id;
    const findFriend = friendsList.find(
      (friend) => friend.username == friendUsername
    );

    if (findFriend && findFriend.online == true) {
      await socket.emit("sendGameInvitation", {
        receiverSocketId: findFriend.socketId,
        data: { username, socketId: socket.id },
      });

      setFriendInvited(friendUsername);
    } else {
      toast.error(
        `Sending invitation to ${friendUsername} was not successful. Please refresh the page`
      );
    }
  };

  const openBtnName = "+";
  const popupHeading = "Friends Online";

  const popupContent = (
    <ul>
      {friendsList.map((friend) => {
        if (friend.online) {
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

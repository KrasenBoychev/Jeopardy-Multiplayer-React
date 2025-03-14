import { useEffect, useState } from "react";
import PopupComp from "../../../../../shared/popup/Popup";
import "./inviteFriend.css";

export default function InviteFriend({ socket, friendProps }) {
  const { friendsList, friendInvited, setFriendInvited, gameFriendResponse } =
    friendProps;

  const inviteFriendToGameRoom = (e) => {    
    // send socket request - invitation
    setFriendInvited(e.target.id);
  };

  const openBtnName = "Invite";
  const popupHeading = "Friends Online";

  const popupContent = (
    <ul>
      {friendsList.map((friend) => {
        if (friend.online) {
          return <li key={friend.username} id={friend.username} onClick={inviteFriendToGameRoom}>{friend.username}</li>;
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

      {/* (
         <button className="friend_online_play" onClick={inviteFriendToGameRoom}>
           Invite
         </button>
      ) */}
    </>
  );
}

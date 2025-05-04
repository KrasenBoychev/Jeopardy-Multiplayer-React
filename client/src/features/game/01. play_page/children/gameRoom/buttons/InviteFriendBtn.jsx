import toast from "react-hot-toast";
import PopupComp from "../../../../../../components/popup/Popup";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../../authentication/authSlice";
import { selectFriends } from "../../friendsList/friendsSlice";
import { selectGameReqSentBy, updateRivalPlayer } from "../../../../gameSlice";
import { setSocketReq } from "../../../../../socket_connection/socketSlice";

export default function InviteFriend() {
  const user = useSelector(selectCurrentUser);
  const friends = useSelector(selectFriends);
  const gameReqSentBy = useSelector(selectGameReqSentBy);
  const dispatch = useDispatch();

  const inviteFriendToGameRoomClickHandler = async (e) => {
    const friendUsername = e.target.id;

    const findFriend = friends.find(
      (friend) => friend.username == friendUsername
    );

    if (
      findFriend &&
      findFriend.online &&
      !findFriend.gameInProgress &&
      !gameReqSentBy.includes(findFriend.username)
    ) {
      dispatch(
        setSocketReq({
          socketReqName: "sendGameReq",
          socketData: {
            receiverSocketId: findFriend.socketId,
            username: user.username,
          },
        })
      );

      dispatch(
        updateRivalPlayer({
          username: friendUsername,
          socketId: findFriend.socketId,
          updateType: "add",
        })
      );

      toast.success("Game request sent to " + friendUsername);
    } else {
      toast.error(friendUsername + "is either offline or in game");
    }
  };

  const openBtnName = "+";
  const popupHeading = "Friends Online";
  const popupContent = (
    <ul>
      {friends.map((friend) => {
        if (
          friend.online &&
          !friend.gameInProgress &&
          !gameReqSentBy.includes(friend.username)
        ) {
          return (
            <li
              key={friend.username}
              id={friend.username}
              onClick={inviteFriendToGameRoomClickHandler}
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
      <PopupComp
        openBtnName={openBtnName}
        heading={popupHeading}
        content={popupContent}
      />
    </>
  );
}

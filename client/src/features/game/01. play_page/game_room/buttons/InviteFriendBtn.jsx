import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectCurrentUser } from "../../../../authentication/authSlice";
import { selectFriends } from "../../friends_list/friendsSlice";
import { selectGameReqSentBy } from "../../../gameSlice";
import { updateRivalPlayer } from "../../../playersSlice";
import { setSocketReq } from "../../../../socket_connection/socketSlice";
import PopupComp from "../../../../../components/popup/Popup";

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
      {friends?.map((friend) => {
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

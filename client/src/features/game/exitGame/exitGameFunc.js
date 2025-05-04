import toast from "react-hot-toast";
import { updateGameInProgress } from "../../authentication/authSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { setFriends } from "../01. play_page/children/friendsList/friendsSlice";
import { deleteCategories } from "../04. categories/categoriesSlice";
import { deleteQuestions } from "../06. questions/questionsSlice";
import { deleteGameDetails } from "../gameSlice";

export default async function exitGameFunc(
  user,
  dispatch,
  getFriendsDetails,
  changeGameInProgress
) {
  dispatch(updateGameInProgress());
  dispatch(deleteGameDetails());
  dispatch(deleteCategories());
  dispatch(deleteQuestions());
  
  try {
    // update userGameInProgress in the db
    await changeGameInProgress();

    // get the friends again and set them in the redux store
    const getFriendsServerRes = await getFriendsDetails(
      user.gameDetails.friendsList
    );
    const friendsList = getFriendsServerRes.data;

    if (friendsList) {
      dispatch(setFriends(friendsList));

      const onlineFriends = friendsList.filter(
        (friend) => friend.online === true
      );

      if (onlineFriends.length > 0) {
        dispatch(
          setSocketReq({
            socketReqName: "sendUserStatus",
            socketData: {
              senderInfo: {
                username: user.username,
                socketId: user.gameDetails.socketId,
              },
              receiverFriends: onlineFriends,
            },
          })
        );
      }
    }
  } catch (err) {
    toast.error("Exiting the game went wrong");
    console.log(err.message);
    // window.location.reload();
  }
}

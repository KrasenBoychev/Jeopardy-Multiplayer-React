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
  getOnlineFriends,
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
    const getOnlineFriendsServerRes = await getOnlineFriends(
      user.gameDetails.friendsList
    );
    const onlineFriends = getOnlineFriendsServerRes.data;

    if (onlineFriends) {
      dispatch(
        setSocketReq({
          socketReqName: "sendExitUserStatus",
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
  } catch (err) {
    toast.error("Exiting the game went wrong");
    console.log(err.message);
  }
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useChangeGameInProgressMutation,
  useGetCategoriesMutation,
} from "../../../gameApiSlice";
import { selectCurrentUser } from "../../../../authentication/authSlice";
import {
  selectIsNewGameStarted,
  selectSetStartGameDetails,
} from "../../../gameSlice";
import { selectRivalPlayer } from "../../../playersSlice";
import CancelGameInvitation from "./buttons/CancelGameInvitation";
import InviteFriend from "./buttons/InviteFriendBtn";
import { selectFriends } from "../friends_list/friendsSlice";
import {
  setDataToOtherPlayer,
  setGameInProgress,
  setPlayersDetails,
} from "./setGameFunc";
import "./gameRoom.css";
import { ThreeDCardDemo } from "./Card";

export default function GameRoom() {
  const user = useSelector(selectCurrentUser);
  const friends = useSelector(selectFriends);
  const rivalPlayer = useSelector(selectRivalPlayer);
  const isNewGameStarted = useSelector(selectIsNewGameStarted);
  const setStartGameDetails = useSelector(selectSetStartGameDetails);
  const [changeGameInProgress] = useChangeGameInProgressMutation();
  const [getCategories] = useGetCategoriesMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (setStartGameDetails) {
      (async () => {
        await setGameInProgress(
          user.username,
          friends,
          changeGameInProgress,
          dispatch
        );
        const [firstPlayerDetails, secondPlayerDetails] = setPlayersDetails(
          user,
          rivalPlayer,
          dispatch
        );
        setDataToOtherPlayer(
          firstPlayerDetails,
          secondPlayerDetails,
          rivalPlayer,
          user.gameDetails.socketId,
          getCategories,
          dispatch
        );
      })();
    }
  }, [setStartGameDetails]);

  return (
    <div className="game_room_wrapper">
      <ThreeDCardDemo player={user} />
      <p className="text-white">VS</p>
      <ThreeDCardDemo player={rivalPlayer} rivalPlayer={true} />

      {/* {isNewGameStarted && <p className="game_room_btn">Loading Game...</p>} */}
    </div>
  );
}

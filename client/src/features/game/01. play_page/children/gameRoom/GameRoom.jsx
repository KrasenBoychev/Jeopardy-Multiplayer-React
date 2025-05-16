import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useChangeGameInProgressMutation,
  useGetCategoriesMutation,
} from "../../../gameApiSlice";
import { selectCurrentUser } from "../../../../authentication/authSlice";
import {
  selectIsNewGameStarted,
  selectRivalPlayer,
  selectSetStartGameDetails,
} from "../../../gameSlice";
import CancelGameInvitation from "./buttons/CancelGameInvitation";
import InviteFriend from "./buttons/InviteFriendBtn";
import { selectFriends } from "../friendsList/friendsSlice";
import {
  setDataToOtherPlayer,
  setGameInProgress,
  setPlayersDetails,
} from "./setGameFunc";
import "./gameRoom.css";

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
      <h3>Game Room</h3>
      <div className="game_room_players">
        <div className="game_room_player_name">
          <p>{user.username}</p>
        </div>
        <div className="game_room_vs">
          <p>VS</p>
        </div>
        <div className="game_room_player_name">
          <p>
            {rivalPlayer ? (
              <>
                {rivalPlayer.username}
                {!isNewGameStarted && <CancelGameInvitation />}
              </>
            ) : (
              <InviteFriend />
            )}
          </p>
        </div>
      </div>
      {isNewGameStarted && <p className="game_room_btn">Loading Game...</p>}
    </div>
  );
}

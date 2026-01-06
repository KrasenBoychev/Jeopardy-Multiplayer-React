import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsNewGameStarted,
  selectReadyToPlay,
  selectSetStartGameDetails,
} from "../gameSlice";
import {
  useChangeGameInProgressMutation,
  useGetCategoriesMutation,
} from "../gameApiSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import { selectFriends } from "./friends_list/friendsSlice";
import { selectRivalPlayer } from "../playersSlice";
import {
  setDataToOtherPlayer,
  setGameInProgress,
  setPlayersDetails,
} from "./game_room/setGameFunc";
import { LoadingGame } from "./LoadingGame";
import StartingPlayer from "../02. starting_player/StartingPlayer";
import FriendsList from "./friends_list/FriendsList";
import { GameCard } from "./game_room/GameCard";

export default function PlayPage() {
  const readyToPlay = useSelector(selectReadyToPlay);
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
    <>
      {!readyToPlay ? (
        <div className="flex-1 flex flex-col px-4 bg-[url(room.png)] bg-cover bg-center">
          {isNewGameStarted ? (
            <LoadingGame />
          ) : (
            <>
              <div className="flex-1"></div>
              <div className="flex-1 flex gap-110 pb-5">
                <FriendsList />
                <GameCard />
              </div>
            </>
          )}
        </div>
      ) : (
        <StartingPlayer />
      )}
    </>
  );
}

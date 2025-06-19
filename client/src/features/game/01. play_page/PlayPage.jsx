import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
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
import { AuroraBackground } from "@/components/ui/aurora-background";
import { LoadingGame } from "./LoadingGame";
import StartingPlayer from "../02. starting_player/StartingPlayer";
import FriendsList from "./friends_list/FriendsList";
import GameRoom from "./game_room/GameRoom";

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
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative w-[100%] flex gap-20 items-center justify-center px-4"
          >
            {isNewGameStarted ? (
              <LoadingGame />
            ) : (
              <>
                <GameRoom />
                <FriendsList />
              </>
            )}
          </motion.div>
        </AuroraBackground>
      ) : (
        <StartingPlayer />
      )}
    </>
  );
}

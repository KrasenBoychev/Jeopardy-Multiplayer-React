import { useSelector } from "react-redux";
import { selectIsNewGameStarted, selectReadyToPlay } from "../gameSlice";
import { AuroraBackground } from "@/components/ui/aurora-background";
import FriendsList from "./children/friends_list/FriendsList";
import GameRoom from "./children/game_room/GameRoom";
import Counter from "../02. counter/Counter";
import ExitGame from "../exitGame/ExitGame";
import { motion } from "motion/react";
import { LoadingGame } from "./children/LoadingGame";
// import StartGameWithOtherPlayer from "./children/startGameWithOtherPlayer/StartGameWithOtherPlayer";
// import "./playPage.css";

export default function PlayPage() {
  const readyToPlay = useSelector(selectReadyToPlay);
  const isNewGameStarted = useSelector(selectIsNewGameStarted);

  return (
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
        {/* Change the component to StartGameWithRandomPlayer - write the code for it */}
        {/* <StartGameWithOtherPlayer /> */}
      </motion.div>
    </AuroraBackground>
  );
}

// return (
//   <>
//     {readyToPlay ? (
//       <>
//         <Counter />
//         <ExitGame />
//       </>
//     ) : (
//       <div className="play_page_container">
//         <section>
//           <GameRoom />
//         </section>
//         <section>
//           <FriendsList />
//           {/* Change the component to StartGameWithRandomPlayer - write the code for it */}
//           {/* <StartGameWithOtherPlayer /> */}
//         </section>
//       </div>
//     )}
//   </>
// );

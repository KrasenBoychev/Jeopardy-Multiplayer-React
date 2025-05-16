import { useDispatch, useSelector } from "react-redux";
import { selectReadyToPlay, setActivePlayer } from "../gameSlice";
import FriendsList from "./children/friendsList/FriendsList";
import GameRoom from "./children/gameRoom/GameRoom";
import Counter from "../02. counter/Counter";
import ExitGame from "../exitGame/ExitGame";
// import StartGameWithOtherPlayer from "./children/startGameWithOtherPlayer/StartGameWithOtherPlayer";
import "./playPage.css";

export default function PlayPage() {
  const readyToPlay = useSelector(selectReadyToPlay);

  return (
    <>
      {readyToPlay ? (
        <>
          <Counter />
          <ExitGame />
        </>
      ) : (
        <div className="play_page_container">
          <section>
            <GameRoom />
          </section>
          <section>
            <FriendsList />
            {/* Change the component to StartGameWithRandomPlayer - write the code for it */}
            {/* <StartGameWithOtherPlayer /> */}
          </section>
        </div>
      )}
    </>
  );
}

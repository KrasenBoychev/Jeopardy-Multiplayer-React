import FriendsList from "./children/friendsList/FriendsList";
import StartGameWithOtherPlayer from "./children/startGameWithOtherPlayer/StartGameWithOtherPlayer";
import GameRoom from "./children/gameRoom/GameRoom";

import "./playPage.css";

export default function PlayPage() {
  return (
    <div className="play_page_container">
      <section>
        <FriendsList />
        <StartGameWithOtherPlayer />
      </section>
      <section>
        <GameRoom />
      </section>
    </div>
  );
}

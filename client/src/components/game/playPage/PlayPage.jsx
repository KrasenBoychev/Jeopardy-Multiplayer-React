import { useState } from "react";
import FriendsList from "./children/friendsList/FriendsList";
import StartGameWithOtherPlayer from "./children/startGameWithOtherPlayer/StartGameWithOtherPlayer";
import GameRoom from "./children/gameRoom/GameRoom";

import "./playPage.css";

export default function PlayPage({ socket, friendsProps }) {
  const { friendsList, gameFriendResponse } = friendsProps;
  const [friendInvited, setFriendInvited] = useState(null);

  return (
    <div className="play_page_container">
      <section>
        <GameRoom socket={socket} friendProps={{ friendsList, friendInvited, setFriendInvited, gameFriendResponse }} />
      </section>
      <section>
        <FriendsList
          socket={socket}
          friendsList={friendsList}
          friendProps={{ friendInvited, setFriendInvited, gameFriendResponse }}
        />

        {/* Change the component to StartGameWithRandomPlayer - write the code for it */}
        {/* <StartGameWithOtherPlayer /> */}
      </section>
    </div>
  );
}

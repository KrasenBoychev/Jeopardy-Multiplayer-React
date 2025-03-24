import { useEffect, useState } from "react";
import StartGameWithOtherPlayer from "./children/startGameWithOtherPlayer/StartGameWithOtherPlayer";
import FriendsList from "./children/friendsList/FriendsList";
import GameRoom from "./children/gameRoom/GameRoom";
import Counter from "../02. counter/Counter";
import ExitGame from "../exitGame/ExitGame";

import "./playPage.css";

export default function PlayPage({
  socket,
  friendsProps,
  notifications,
  playersProps,
  gameRoomNameProps,
}) {
  const {
    friendsList,
    friendInvited,
    setFriendInvited,
    isNewGameStarted,
    setIsNewGameStarted,
  } = friendsProps;
  const { firstPlayer, secondPlayer } = playersProps;
  const { gameRoomName, setGameRoomName } = gameRoomNameProps;
  const { notificationsList } = notifications;

  const [renderStartingPlayer, setRenderStartingPlayer] = useState(false);

  useEffect(() => {
    if (isNewGameStarted) {
      setTimeout(() => {
        setRenderStartingPlayer(true);
      }, 2000);
    }
  }, [isNewGameStarted]);

  return (
    <>
      {renderStartingPlayer ? (
        <>
          <Counter props={{ socket, firstPlayer, secondPlayer }} />
          <ExitGame
            props={{
              socket,
              friendsList,
              setFriendInvited,
              gameRoomName,
              setGameRoomName,
              setRenderStartingPlayer,
              setIsNewGameStarted,
              firstPlayer,
              secondPlayer,
            }}
          />
          {/* TO DO: write the logic in ExitGame.jsx */}
          {/* setRenderStartingPlayer should be set to false in ExitGame ??? */}
        </>
      ) : (
        <div className="play_page_container">
          <section>
            <GameRoom
              socket={socket}
              friendProps={{
                friendsList,
                friendInvited,
                setFriendInvited,
                isNewGameStarted,
                firstPlayer,
                secondPlayer,
              }}
              notificationsList={notificationsList}
            />
          </section>
          <section>
            <FriendsList socket={socket} friendsList={friendsList} />
            {/* Change the component to StartGameWithRandomPlayer - write the code for it */}
            {/* <StartGameWithOtherPlayer /> */}
          </section>
        </div>
      )}
    </>
  );
}

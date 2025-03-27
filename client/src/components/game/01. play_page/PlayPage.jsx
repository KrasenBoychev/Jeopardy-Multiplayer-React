import { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { GameContext } from "../../../contexts/GameContext";
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

  const { username } = useAuthContext();
  const friendDetails =
    firstPlayer.username != username ? firstPlayer : secondPlayer;

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
        <GameContext.Provider
          value={{
            socket,
            friendUsername: friendDetails.username,
            friendSocketId: friendDetails.socketId,
            firstPlayerUsername: firstPlayer.username,
            secondPlayerUsername: secondPlayer.username,
          }}
        >
          <Counter />
          <ExitGame
            props={{
              friendsList,
              setFriendInvited,
              gameRoomName,
              setGameRoomName,
              setRenderStartingPlayer,
              setIsNewGameStarted,
            }}
          />
        </GameContext.Provider>
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

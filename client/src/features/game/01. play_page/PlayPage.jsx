// import { useEffect, useState } from "react";
// import { useAuthContext } from "../../../contexts/AuthContext";
// import { GameContext } from "../../../contexts/GameContext";
// import StartGameWithOtherPlayer from "./children/startGameWithOtherPlayer/StartGameWithOtherPlayer";
import FriendsList from "./children/friendsList/FriendsList";
// import GameRoom from "./children/gameRoom/GameRoom";
// import Counter from "../02. counter/Counter";
// import ExitGame from "../exitGame/ExitGame";
import "./playPage.css";

export default function PlayPage() {
  //   const { firstPlayer, secondPlayer } = playersProps;
  //   const { gameRoomName, setGameRoomName } = gameRoomNameProps;
  //   const { notificationsList } = notifications;

  //   const [renderStartingPlayer, setRenderStartingPlayer] = useState(false);

  //   const friendDetails =
  //     firstPlayer.username != username ? firstPlayer : secondPlayer;

  // useEffect(() => {
  //   if (isNewGameStarted) {
  //     setTimeout(() => {
  //       setRenderStartingPlayer(true);
  //     }, 2000);
  //   }
  // }, [isNewGameStarted]);

  return (
    <>
      {/* {renderStartingPlayer ? (
        <>
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
        </>
      ) : ( */}
      <div className="play_page_container">
        {/* <section>
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
          </section> */}
        <section>
          <FriendsList />
          {/* Change the component to StartGameWithRandomPlayer - write the code for it */}
          {/* <StartGameWithOtherPlayer /> */}
        </section>
      </div>
      {/* )} */}
    </>
  );
}

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthContextProvider, useAuthContext } from "./contexts/AuthContext";

import "./App.css";

import PrivateGuard from "./common/PrivateGuard";
import PublicGuard from "./common/PublicGuard";
import AdminGuard from "./common/AdminGuard";

import Home from "./features/main_pages/home_page/Home";
import About from "./features/main_pages/about_page/About";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import Logout from "./features/authentication/Logout";
import Create from "./features/create/Create";
import CreateCategory from "./features/create/createCategory/CreateCategory";
import CreateQuestion from "./features/create/createQuestion/CreateQuestion";
import NotFound from "./features/main_pages/not_found_page";
import PlayPage from "./features/game/01. play_page/PlayPage";
import Socket from "./features/socket_connection/Socket";
import NotificationsBox from "./components/notificationsBox/NotificationsBox";

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);

  const [friendsList, setFriendsList] = useState([]);
  const [friendInvited, setFriendInvited] = useState(null);
  const [notificationsList, setNotificationsList] = useState([]);
  const [isNewGameStarted, setIsNewGameStarted] = useState(false);
  const [firstPlayer, setFirstPlayer] = useState({
    username: null,
    socketId: null,
  });
  const [secondPlayer, setSecondPlayer] = useState({
    username: null,
    socketId: null,
  });
  const [gameRoomName, setGameRoomName] = useState(null);

  return (
    <>
      <Toaster />

      <AuthContextProvider>
        {!isNewGameStarted && <Header />}

        {/* {isConnected && ( */}
        {/* <Socket
          isUserAuthenticated={isUserAuthenticated}
          // setIsConnected={setIsConnected}
          // socketProps={{ socket, setSocket }}
          // friendsProps={{ friendsList, setFriendsList }}
          // setNotificationsList={{ setNotificationsList }}
          // newGameStartedProps={{ isNewGameStarted }}
        /> */}
        {/* )} */}

        {/* {!isNewGameStarted && (
          <NotificationsBox
            socket={socket}
            friendsListProps={{ friendsList, setFriendsList }}
            friendInvitedProps={{ friendInvited, setFriendInvited }}
            notifications={{
              notificationsList,
              setNotificationsList,
            }}
            setIsNewGameStarted={setIsNewGameStarted}
            setPlayersProps={{ setFirstPlayer, setSecondPlayer }}
            gameRoomNameProps={{ gameRoomName, setGameRoomName }}
          />
        )} */}

        <main>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/about" element={<About />} />

            <Route element={<PublicGuard />}>
              <Route
                path="/login"
                element={
                  <Login setIsUserAuthenticated={setIsUserAuthenticated} />
                }
              />
              <Route
                path="/register"
                element={
                  <Register setIsUserAuthenticated={setIsUserAuthenticated} />
                }
              />
            </Route>

            <Route element={<PrivateGuard />}>
              {/* <Route
                path="/play"
                element={
                  <PlayPage
                    socket={socket}
                    friendsProps={{
                      friendsList,
                      friendInvited,
                      setFriendInvited,
                      isNewGameStarted,
                      setIsNewGameStarted,
                    }}
                    notifications={{
                      notificationsList,
                    }}
                    playersProps={{ firstPlayer, secondPlayer }}
                    gameRoomNameProps={{ gameRoomName, setGameRoomName }}
                  />
                }
              /> */}
              <Route
                path="/logout"
                element={
                  <Logout
                    // socketProps={{ socket, setSocket }}
                    friendsProps={{ friendsList, setFriendsList }}
                    setFriendInvited={{ setFriendInvited }}
                    setIsUserAuthenticated={setIsUserAuthenticated}
                  />
                }
              />
            </Route>
            {/* 
            <Route element={<AdminGuard />}>
              <Route path="/create" element={<Create />} />
              <Route path="/createCategory" element={<CreateCategory />} />
              <Route
                path="/createQuestion"
                element={
                  <CreateQuestion
                    props={{
                      category: null,
                      setQuestion: null,
                      move: null,
                      setMove: null,
                      setRecordCategoryAndQuestions: null,
                    }}
                  />
                }
              />
            </Route> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isNewGameStarted && <Footer />}
      </AuthContextProvider>
    </>
  );
}

export default App;

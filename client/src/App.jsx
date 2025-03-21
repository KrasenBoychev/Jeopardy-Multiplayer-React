import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthContextProvider } from "./contexts/AuthContext";

import "./App.css";

import PrivateGuard from "./common/PrivateGuard";
import PublicGuard from "./common/PublicGuard";
import AdminGuard from "./common/AdminGuard";

import Home from "./components/core/home/Home";
import About from "./components/core/about/About";
import Header from "./components/core/header/Header";
import Footer from "./components/core/footer/Footer";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Logout from "./components/authentication/Logout";
import Create from "./components/create/Create";
import CreateCategory from "./components/create/createCategory/CreateCategory";
import CreateQuestion from "./components/create/createQuestion/CreateQuestion";
import NotFound from "./components/core/notFound/NotFound";
import PlayPage from "./components/game/playPage/PlayPage";
import Socket from "./components/core/Socket";
import NotificationsBox from "./components/core/notificationsBox/NotificationsBox";

function App() {
  const [isNewGameStarted, setIsNewGameStarted] = useState(false);
  const [globalChannel, setGlobalChannel] = useState(null);
  const [socket, setSocket] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [friendInvited, setFriendInvited] = useState(null);
  const [notificationsList, setNotificationsList] = useState([]);

  return (
    <>
      <Toaster />

      <AuthContextProvider>
        <Socket
          socketProps={{ socket, setSocket }}
          friendsProps={{ friendsList, setFriendsList }}
          friendInvited={friendInvited}
          setNotificationsList={{ setNotificationsList }}
          newGameStartedProps={{ isNewGameStarted, setIsNewGameStarted }}
        />

        {!isNewGameStarted && <Header />}

        {!isNewGameStarted && (
          <NotificationsBox
            socket={socket}
            friendsListProps={{ friendsList, setFriendsList }}
            friendInvitedProps={{ friendInvited, setFriendInvited }}
            notifications={{ notificationsList, setNotificationsList }}
            setIsNewGameStarted={setIsNewGameStarted}
          />
        )}

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  // game={{ isNewGameStarted, setIsNewGameStarted }}
                  // globalChannelInfo={{ globalChannel, setGlobalChannel }}
                  socket={socket}
                />
              }
            />
            <Route path="/about" element={<About />} />

            <Route element={<PublicGuard />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<PrivateGuard />}>
              <Route
                path="/play"
                element={
                  <PlayPage
                    // game={{ isNewGameStarted, setIsNewGameStarted }}
                    // globalChannelInfo={{ globalChannel, setGlobalChannel }}
                    socket={socket}
                    friendsProps={{
                      friendsList,
                      friendInvited,
                      setFriendInvited,
                      isNewGameStarted,
                    }}
                    notificationsList={notificationsList}
                  />
                }
              />
              <Route
                path="/logout"
                element={
                  <Logout
                    socketProps={{ socket, setSocket }}
                    friendsProps={{ friendsList, setFriendsList }}
                    setFriendInvited={{ setFriendInvited }}
                  />
                }
              />
            </Route>

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
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isNewGameStarted && <Footer />}
      </AuthContextProvider>
    </>
  );
}

export default App;

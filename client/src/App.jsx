import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthContextProvider } from "./contexts/AuthContext";

import "./App.css";

import PrivateGuard from "./common/PrivateGuard";
import PublicGuard from "./common/PublicGuard";
import AdminGuard from "./common/AdminGuard";

import Home from "./components/home/Home";
import About from "./components/about/About";
import Header from "./components/core/header/Header";
import Footer from "./components/core/footer/Footer";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Logout from "./components/authentication/Logout";
import Create from "./components/create/Create";
import CreateCategory from "./components/create/createCategory/CreateCategory";
import CreateQuestion from "./components/create/createQuestion/CreateQuestion";
import NotFound from "./components/core/notFound/NotFound";
import JoinGame from "./components/game/startGame/joinGame/JoinGame";
import GameInvitation from "./components/game/gameInvitation/GameInvitation";

function App() {
  const [isNewGameStarted, setIsNewGameStarted] = useState(false);
  const [globalChannel, setGlobalChannel] = useState(null);
  const [newGameInvitation, setNewGameInvitation] = useState(false);
  const [socket, setSocket] = useState(null);

  return (
    <>
      <Toaster />

      <AuthContextProvider>
        {!isNewGameStarted && <Header socketProps={{ socket, setSocket }} />}
        {!isNewGameStarted && newGameInvitation && (
          <GameInvitation gameInvitation={setNewGameInvitation} />
        )}

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  // game={{ isNewGameStarted, setIsNewGameStarted }}
                  // gameInvitation={{ newGameInvitation, setNewGameInvitation }}
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
                  <JoinGame
                    game={{ isNewGameStarted, setIsNewGameStarted }}
                    gameInvitation={{ newGameInvitation, setNewGameInvitation }}
                    globalChannelInfo={{ globalChannel, setGlobalChannel }}
                  />
                }
              />
              <Route path="/logout" element={<Logout />} />
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

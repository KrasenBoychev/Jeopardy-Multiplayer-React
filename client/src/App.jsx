import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContextProvider, useAuthContext } from "./contexts/AuthContext";
import { StreamChat } from "stream-chat";
import { getGameToken } from "../api/game-api";

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
  const [client, setClient] = useState(null);
  const [globalChannel, setGlobalChannel] = useState(null);
  const [newGameInvitation, setNewGameInvitation] = useState(false);

  const authLocalStorage = localStorage.getItem("auth");

  useEffect(() => {
    (async function joinChannel() {
      if (authLocalStorage && !isNewGameStarted && !client) {
        const api_key = "tswxm74zz6uc";
        const myClient = StreamChat.getInstance(api_key);

        const { username } = JSON.parse(authLocalStorage);

        let active = true;
        await load();

        async function load() {
          try {
            const { token, userId } = await getGameToken(username);

           await myClient.connectUser(
              {
                id: userId,
                name: username,
              },
              token
            );

            if (!active) {
              return;
            }

            setClient(myClient);
          } catch (error) {
            toast.error(
              "Can not play at this moment. Please send a message to our customer service team."
            );
          }
        }
      }

      if (client) {
        const newChannel = await client.channel("team", {
          members: [client.userID],
        });

        await newChannel.watch();

        setGlobalChannel(newChannel);

        toast.success("Yeee");
      }
      
      // globalChannel.watch();
      

      return async () => {
        active = false;
        // await globalChannel.stopWatching();
        client.disconnectUser();
      };
    })();
  }, [authLocalStorage, client]);

  return (
    <>
      <Toaster />

      <AuthContextProvider>
        {!isNewGameStarted && <Header />}
        {!isNewGameStarted && newGameInvitation && (
          <GameInvitation gameInvitation={setNewGameInvitation} />
        )}

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  game={{ isNewGameStarted, setIsNewGameStarted }}
                  gameInvitation={{ newGameInvitation, setNewGameInvitation }}
                  globalChannelInfo={{ globalChannel, setGlobalChannel }}
                  client={client}
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
                    client={client}
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

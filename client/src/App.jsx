import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { StreamChat } from "stream-chat";

import "./App.css";

import { AuthContextProvider } from "./contexts/AuthContext";

import PrivateGuard from "./common/PrivateGuard";
import PublicGuard from "./common/PublicGuard";
import AdminGuard from "./common/AdminGuard";

import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Logout from "./components/authentication/Logout";
import Play from "./components/game/Play";
import Create from "./components/create/Create";
import CreateCategory from "./components/create/createCategory/CreateCategory";
import CreateQuestion from "./components/create/createQuestion/CreateQuestion";
import NotFound from "./components/notFound/NotFound";

function App() {
  const [isGame, setIsGame] = useState(false);
  const [channel, setChannel] = useState(null);

  const api_key = "tswxm74zz6uc";
  const client = StreamChat.getInstance(api_key);

  return (
    <>
      <Toaster />

      <AuthContextProvider>
        <Header
          game={{ isGame, setIsGame }}
          channel={{ channel, setChannel }}
          client={client}
        />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<PublicGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateGuard />}>
            <Route
              path="/play"
              element={
                <Play
                  game={{ isGame, setIsGame }}
                  channel={{ channel, setChannel }}
                  client={client}
                />
              }
            />
            <Route path="/logout" element={<Logout client={client} />} />
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

        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;

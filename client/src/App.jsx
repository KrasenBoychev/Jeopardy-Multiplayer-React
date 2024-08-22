import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { StreamChat } from "stream-chat";

import "./App.css";

import { AuthContextProvider } from "./contexts/AuthContext";

import PrivateGuard from "./common/PrivateGuard";
import PublicGuard from "./common/PublicGuard";

import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Logout from "./components/authentication/Logout";
import NotFound from "./components/notFound/NotFound";
import Play from "./components/game/Play";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const api_key = "juudbb2ng7uh";
  const client = StreamChat.getInstance(api_key);

  return (
    <>
      <Toaster />

      <AuthContextProvider>
        <Header props={{ isAuth, setIsAuth, client }} />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<PublicGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateGuard />}>
            <Route
              path="/play"
              element={<Play props={{ isAuth, setIsAuth, client }} />}
            />
            <Route
              path="/logout"
              element={<Logout client={ client } />}
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

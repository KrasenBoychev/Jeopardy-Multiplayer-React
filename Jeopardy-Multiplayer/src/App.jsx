import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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

function App() {
  return (
    <>
      <Toaster />

      <AuthContextProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<PublicGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateGuard />}>
            <Route path="/logout" element={<Logout />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;

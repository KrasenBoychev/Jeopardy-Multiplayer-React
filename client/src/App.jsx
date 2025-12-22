import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/authentication/authSlice";
import { singleQuestionInitialValues } from "./features/create/createQuestion/initialValues";
import Footer from "./components/Footer";
import {
  RequireAuthGuard,
  NoAuthGuard,
  AdminGuard,
} from "./features/authentication/RoutesGuards";
import Logout from "./features/authentication/Logout";
import Nav from "./components/Nav";
import HomePageNoAuth from "./features/main_pages/home_page/HomePageNoAuth";
import HomePageAuth from "./features/main_pages/home_page/HomePageAuth";
import AboutPage from "./features/main_pages/about_page/AboutPage";
import Socket from "./features/socket_connection/Socket";
import PlayPage from "./features/game/01. play_page/PlayPage";
import Create from "./features/create/Create";
import CreateCatAndQMiddleware from "./features/create/CreateCatAndQMiddleware";
import CreateQuestion from "./features/create/createQuestion/CreateQuestion";
import NotFound from "./features/main_pages/not_found_page/NotFound";
import "./App.css";

function App() {
  const user = useSelector(selectCurrentUser);
  const [socket, setSocket] = useState(null);

  return (
    <>
      <Toaster />
      {user && <Socket socketProps={{ socket, setSocket }} />}
      {user && !user.gameDetails.gameInProgress && <Nav />}

      <main>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePageNoAuth />} />
          <Route path="/about" element={<AboutPage />} />

          {/* no auth routes */}
          <Route element={<NoAuthGuard />}>
            {/* <Route path="/" element={<HomePageNoAuth />} /> */}
          </Route>

          {/* protected routes */}
          <Route element={<RequireAuthGuard />}>
            {/* <Route path="/" element={<HomePageAuth />} /> */}
            <Route path="/play" element={<PlayPage />} />
            <Route path="/logout" element={<Logout socket={socket} />} />
          </Route>

          {/* admin routes */}
          <Route element={<AdminGuard />}>
            <Route path="/create" element={<Create />} />
            <Route
              path="/createCatAndQ"
              element={<CreateCatAndQMiddleware />}
            />
            <Route
              path="/createQuestion"
              element={
                <CreateQuestion
                  formInitialValues={singleQuestionInitialValues()}
                />
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {(!user || !user.gameDetails.gameInProgress) && <Footer />}
    </>
  );
}

export default App;

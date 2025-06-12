import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/authentication/authSlice";
import Footer from "./components/footer/Footer";
import RequireAuth from "./features/authentication/RequireAuth";
import Logout from "./features/authentication/Logout";
// import Create from "./features/create/Create";
// import CreateCategory from "./features/create/createCategory/CreateCategory";
// import CreateQuestion from "./features/create/createQuestion/CreateQuestion";
import Socket from "./features/socket_connection/Socket";
import Notifications from "./features/notifications/Notifications";
import PlayPage from "./features/game/01. play_page/PlayPage";
import NotFound from "./features/main_pages/not_found_page/NotFound";
import { NavbarMenu } from "./components/NavbarMenu";
import { AboutPage } from "./features/main_pages/about_page/AboutPage";
import { HomePageNotAuth } from "./features/main_pages/home_page/HomePageNotAuth";
import { LoginForm } from "./features/authentication/LoginForm";
import { RegisterForm } from "./features/authentication/RegisterForm";
import "./App.css";

function App() {
  const user = useSelector(selectCurrentUser);
  const [socket, setSocket] = useState(null);

  return (
    <>
      <Toaster />
      {user && <Socket socketProps={{ socket, setSocket }} />}

      {(!user || !user.gameDetails.gameInProgress) && <NavbarMenu />}

      <main>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePageNotAuth />} />
          <Route path="/about" element={<AboutPage />} />

          {/* no auth routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/play" element={<PlayPage />} />
            <Route path="/logout" element={<Logout socket={socket} />} />
          </Route>

          {/* <Route element={<PrivateGuard />}> */}
          {/* 
          </Route> */}
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

      {(!user || !user.gameDetails.gameInProgress) && <Footer />}
    </>
  );
}

export default App;

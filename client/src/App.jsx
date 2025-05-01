import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/authentication/authSlice";
import Home from "./features/main_pages/home_page/Home";
import About from "./features/main_pages/about_page/About";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import RequireAuth from "./features/authentication/RequireAuth";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import Logout from "./features/authentication/Logout";
// import Create from "./features/create/Create";
// import CreateCategory from "./features/create/createCategory/CreateCategory";
// import CreateQuestion from "./features/create/createQuestion/CreateQuestion";
import Socket from "./features/socket_connection/Socket";
import Notifications from "./components/notifications/Notifications";
import PlayPage from "./features/game/01. play_page/PlayPage";
import NotFound from "./features/main_pages/not_found_page/NotFound";
import "./App.css";

function App() {
  const user = useSelector(selectCurrentUser);
  const [socket, setSocket] = useState(null);

  return (
    <>
      <Toaster />
      {user && (
        <>
          <Socket socketProps={{ socket, setSocket }} />
          <Notifications />
        </>
      )}

      {(!user || !user.gameDetails.gameInProgress) && <Header />}

      <main>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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

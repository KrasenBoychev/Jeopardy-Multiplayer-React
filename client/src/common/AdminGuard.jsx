import { useAuthContext } from "../contexts/AuthContext.tsx";
import { Outlet } from "react-router-dom";
import { adminId } from "./credentials.ts";
import NotFound from "../components/core/notFound/NotFound.jsx";

export default function AdminGuard() {
  const { isAuthenticated, userId } = useAuthContext();

  return isAuthenticated && userId == adminId ? <Outlet /> : <NotFound />;
}

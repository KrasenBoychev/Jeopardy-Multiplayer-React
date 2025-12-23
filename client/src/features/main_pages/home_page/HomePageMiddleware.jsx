import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../authentication/authSlice";
import HomePageNoAuth from "./HomePageNoAuth";
import HomePageAuth from "./HomePageAuth";

export default function HomePageMiddleware() {
  const user = useSelector(selectCurrentUser);
  return <>{!user ? <HomePageNoAuth /> : <HomePageAuth />}</>;
}

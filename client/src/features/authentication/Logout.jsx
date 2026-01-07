import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { deleteCredentials } from "./authSlice";
import { useLogOutMutation } from "./authApiSlice";
import Loader from "../../components/Loader";

export default function Logout() {
  const [logOut, { isSuccess }] = useLogOutMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function logout() {
      try {
        localStorage.removeItem("auth");
        await logOut();
        dispatch(deleteCredentials());
      } catch (err) {
        toast.error("Logout Failed. Please refresh the page");
      }
    })();
  }, []);

  return <>{!isSuccess ? <Loader /> : <Navigate to="/" />}</>;
}

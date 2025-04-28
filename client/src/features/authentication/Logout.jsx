import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCredentials } from "./authSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLogOutMutation } from "./authApiSlice";

export default function Logout() {
  const [logOut, { isLoading }] = useLogOutMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function logout() {
      try {
        await logOut();
        dispatch(deleteCredentials());
      } catch (err) {
        toast.error('Logout Failed')
      }
    })();
  }, []);

  return <Navigate to="/" />;
}

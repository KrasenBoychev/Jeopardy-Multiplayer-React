/* eslint-disable no-unused-vars */
import { login, logout, register } from "../../api/requester";

import { useAuthContext } from "../contexts/AuthContext";

export const useLogin = () => {
  const { changeAuthState } = useAuthContext();

  const loginHandler = async (email, password) => {
    const { password: _, ...authData } = await login(email, password);

    changeAuthState(authData);

    return authData;
  };

  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useAuthContext();

  const registerHandler = async (email, username, password) => {
    const { password: _, ...authData } = await register(
      email,
      username,
      password
    );

    changeAuthState(authData);

    return authData;
  };

  return registerHandler;
};

export const useLogout = () => {
  const { logout: localLogout } = useAuthContext();

  const logoutHandler = async () => {
    await logout();
    localLogout();
  };

  return logoutHandler;
};

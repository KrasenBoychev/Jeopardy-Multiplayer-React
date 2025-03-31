import { login, logout, register } from "../../api/auth-api";
import { useAuthContext } from "../contexts/AuthContext";

export const useLogin = () => {
  const { changeAuthState } = useAuthContext();

  const loginHandler = async (email: string, password: string) => {
    const { password: _, ...authData } = await login(email, password);

    changeAuthState(authData);

    return authData;
  };

  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useAuthContext();

  const registerHandler = async (
    email: string,
    username: string,
    password: string
  ) => {
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

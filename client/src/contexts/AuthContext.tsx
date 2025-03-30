import React, { createContext, useContext } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { AuthDataType } from "../types/authDataType";

export const AuthContext = createContext({
  userId: "",
  email: "",
  username: "",
  accessToken: "",
  isAuthenticated: false,
  points: 0,
  changeAuthState: (state: AuthDataType) => {},
  logout: () => {},
});

export function AuthContextProvider(props: any) {
  const [authState, setAuthState] = usePersistedState("auth", {});

  const changeAuthState = (state: AuthDataType) => {
    setAuthState(state);
  };

  const logout = () => {
    setAuthState(null);
  };

  const contextData: AuthDataType = {
    userId: authState?.userId,
    email: authState?.email,
    username: authState?.username,
    accessToken: authState?.accessToken,
    isAuthenticated: !!authState?.email,
    points: authState?.points,
    changeAuthState,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const authData = useContext(AuthContext);

  return authData;
}

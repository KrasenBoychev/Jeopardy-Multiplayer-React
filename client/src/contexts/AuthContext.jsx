/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react';

import usePersistedState from '../hooks/usePersistedState';

export const AuthContext = createContext({
  userId: '',
  email: '',
  username: '',
  accessToken: '',
  isAuthenticated: false,
  points: '',
  changeAuthState: (authState = {}) => null,
  logout: () => null,
});

export function AuthContextProvider(props) {
  const [authState, setAuthState] = usePersistedState('auth', {});

  const changeAuthState = (state) => {
    setAuthState(state);
  };

  const logout = () => {
    setAuthState(null);
  };

  const contextData = {
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

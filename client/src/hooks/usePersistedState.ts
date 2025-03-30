import { useState } from "react";
import { AuthDataType } from "../types/authDataType";

export default function usePersistedState(key: string, initialState: {}) {
  const [state, setState] = useState<any>(() => {
    const persistedAuth = localStorage.getItem(key);

    if (!persistedAuth) {
      return initialState;
    }

    const authData: AuthDataType = JSON.parse(persistedAuth);

    return authData;
  });

  const updateState = (value: AuthDataType | null) => {
    if (!value) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }

    setState(value);
  };

  return [state, updateState];
}

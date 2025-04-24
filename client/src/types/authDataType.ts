export interface AuthDataType {
  userId: undefined | string;
  email: undefined | string;
  username: undefined | string;
  accessToken: undefined | string;
  isAuthenticated: undefined | boolean;
  points: undefined | number;
  changeAuthState: (state: AuthDataType) => null | void;
  logout: () => null | void;
}

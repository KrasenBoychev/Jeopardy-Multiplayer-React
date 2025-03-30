export interface AuthDataType {
  userId: string;
  email: string;
  username: string;
  accessToken: string;
  isAuthenticated: boolean;
  points: number;
  changeAuthState: (state: AuthDataType) => null | void;
  logout: () => null | void;
}

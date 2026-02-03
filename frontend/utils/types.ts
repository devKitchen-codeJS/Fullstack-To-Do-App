export interface ITokens {
  access_token: string;
  refresh_token: string;
}
export interface IUser {
  id: string;
  email: string;
}

export interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
}

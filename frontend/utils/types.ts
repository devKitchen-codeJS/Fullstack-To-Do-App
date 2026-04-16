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

export type WindowState = {
  id: string;
  type: WindowType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isEdditMode: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosed: boolean;
};

export enum WindowType {
  Calendar = "Calendar",
  Chat = "Chat",
  Chart = "Chart",
  Todo = "Todo",
}

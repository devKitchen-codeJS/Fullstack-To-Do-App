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
  position: Vector;
  size: Size;
  zIndex: number;
  isEdditMode: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosed: boolean;
};

export interface Vector {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export enum WindowType {
  Calendar = "Calendar",
  Chat = "Chat",
  Chart = "Chart",
  Todo = "Todo",
}

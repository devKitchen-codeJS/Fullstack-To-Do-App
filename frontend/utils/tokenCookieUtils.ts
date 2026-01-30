import { ITokens, IUser } from "./types";

const isBrowser = typeof window !== "undefined";

const keys = {
  access: "access_token",
  refresh: "refresh_token",
  user: "user_data",
};

// -------------------------
// Cookie helpers (client)
// -------------------------
const setCookie = (key: string, value: string, days = 1) => {
  if (!isBrowser) return;

  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  document.cookie = `${key}=${value}; path=/; expires=${expires.toUTCString()}`;
};

const getCookie = (key: string): string | null => {
  if (!isBrowser) return null;

  const match = document.cookie.match(
    new RegExp("(^| )" + key + "=([^;]+)")
  );
  return match ? decodeURIComponent(match[2]) : null;
};

const removeCookie = (key: string) => {
  if (!isBrowser) return;
  document.cookie = `${key}=; Max-Age=0; path=/`;
};

// -------------------------
// Tokens
// -------------------------
export const saveToken = (data: ITokens) => {
  setCookie(keys.access, data.access_token, 1); 
  setCookie(keys.refresh, data.refresh_token, 30); 
};

export const removeToken = () => {
  removeCookie(keys.access);
  removeCookie(keys.refresh);
};

export const getAccessToken = (): string | null => {
  return getCookie(keys.access);
};

export const getRefreshToken = (): string | null => {
  return getCookie(keys.refresh);
};

// -------------------------
// User
// -------------------------
export const saveUserData = (user: IUser) => {
  setCookie(keys.user, JSON.stringify(user), 30);
};

export const getUserData = (): IUser | null => {
  const data = getCookie(keys.user);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const removeUserDataFromStorage = () => {
  removeToken();
  removeCookie(keys.user);
};
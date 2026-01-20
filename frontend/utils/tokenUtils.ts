import { ITokens, IUser } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const isBrowserEnvironment = typeof window !== "undefined";

const keys = {
  access: "access_token",
  refresh: "refresh_token",
  user: "user_data",
};

const storageWrapper = (
  action: "get" | "set" | "remove",
  key: string,
  value?: any
): any => {
  if (!isBrowserEnvironment) return;
  try {
    if (action === "get") {
      return localStorage.getItem(key);
    } else if (action === "set") {
      localStorage.setItem(key, value);
    } else if (action === "remove") {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.log("LocalStorage operation error:", error);
  }
};

export const saveToken = (data: ITokens) => {
  storageWrapper("set", keys.access, data.access_token);
  storageWrapper("set", keys.refresh, data.refresh_token);
};
export const removeToken = () => {
  storageWrapper("remove", keys.access);
  storageWrapper("remove", keys.refresh);
};
export const getAccessToken = (): string | null => {
  return storageWrapper("get", keys.access);
};
export const getRefreshToken = (): string | null => {
  return storageWrapper("get", keys.refresh) ?? "";
};
export const saveUserData = (user: string) => {
  storageWrapper("set", keys.user, JSON.stringify(user));
};
export const getUserData = (): IUser | null => {
  const userData = storageWrapper("get", keys.user);
  if (!userData) return null;
  console.log("userData", userData);
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error("Failed to parse user JSON from localStorage:", error);
    return null;
  }
};

export const removeUserFromLocalStorage = () => {
  storageWrapper("remove", keys.user);
};

export const removeUserDataFromLocalStorage = () => {
  removeToken();
  removeUserFromLocalStorage();
};

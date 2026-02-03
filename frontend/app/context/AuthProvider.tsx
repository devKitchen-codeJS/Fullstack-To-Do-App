"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { IUser } from "@/utils/types";
import { removeUserDataFromStorage } from "@/utils/tokenCookieUtils";
import axiosInstance from "@/utils/axiosInstance";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/auth/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    removeUserDataFromStorage();
    setUser(null);
    window.location.href = "/signin";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
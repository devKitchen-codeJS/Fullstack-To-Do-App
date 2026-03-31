"use client";

import { WindowContext } from "@/app/context/Window/WindowContext";
import { useContext } from "react";

export const useWindow = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindow must be used within a WindowProvider");
  }
  return context;
};

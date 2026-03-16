"use client";
import { WindowState } from "@/utils/types";
import { nanoid } from "nanoid";
import React, { createContext, useContext, useState, ReactNode } from "react";

type WindowContextType = {
  windows: WindowState[];
  addWindow: (window: WindowState["type"]) => void;
  updateWindow: (id: string, updatedWindow: Partial<WindowState>) => void;
  removeWindow: (id: string) => void;
};

// type WindowType ={
//     id: string;
//     component: React.ReactNode;
//     x: number;
//     y: number;
// }

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [windows, setWindows] = useState<WindowState[]>([]);


const addWindow = (type: WindowState["type"]) => {
  setWindows((prev) => {
    const offset = prev.length * 40;

    const newWindow: WindowState = {
      id: nanoid(),
      type,
      position: {
        x: 100 + offset,
        y: 100 + offset,
      },
      size: {
        width: 400,
        height: 300,
      },
      zIndex: prev.length + 1,
      isMinimized: false,
      isMaximized: false,
      isClosed: false,
    };

    return [...prev, newWindow];
  });
};

  const updateWindow = (id: string, updatedWindow: Partial<WindowState>) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, ...updatedWindow } : window
      )
    );
  };

  const removeWindow = (id: string) => {
    setWindows((prev) => prev.filter((window) => window.id !== id));
  };

  return (
    <WindowContext.Provider
      value={{ windows, addWindow, updateWindow, removeWindow }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindowContext must be used within a WindowProvider");
  }
  return context;
};

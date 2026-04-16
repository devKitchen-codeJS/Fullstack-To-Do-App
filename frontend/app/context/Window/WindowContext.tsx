"use client";
import { WindowState } from "@/utils/types";
import { nanoid } from "nanoid";
import React, { createContext, useContext, useState, ReactNode } from "react";

type WindowContextType = {
  // allowToDrag: boolean;
  isEdditMode: boolean;
  windows: WindowState[];
  zIndex: number;
  toggleEdditMode: () => void;
  addWindow: (window: WindowState["type"]) => void;
  updateWindow: (id: string, updatedWindow: Partial<WindowState>) => void;
  removeWindow: (id: string) => void;
  bringToFront: (id: string) => void;
};

export const WindowContext = createContext<WindowContextType | undefined>(
  undefined
);

export const WindowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [isEdditMode, setIsEdditMode] = useState(false);
  const [zIndex, setZIndex] = useState(1);
  const toggleEdditMode = () => {
    setIsEdditMode(!isEdditMode);
  };

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
        isEdditMode: false,
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

  const bringToFront = (id: string) => {
    console.log("bringToFront", id);
    setZIndex((prev) => {
      const next = prev + 1;

      setWindows((windows) =>
        windows.map((w) => (w.id === id ? { ...w, zIndex: next } : w))
      );

      return next;
    });
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        isEdditMode,
        zIndex,
        toggleEdditMode,
        addWindow,
        updateWindow,
        removeWindow,
        bringToFront,
      }}>
      {children}
    </WindowContext.Provider>
  );
};

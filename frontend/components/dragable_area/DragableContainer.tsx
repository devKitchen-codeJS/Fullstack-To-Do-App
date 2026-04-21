"use client";

import { useWindow } from "@/hooks/useWindow";
import WindowWrapper from "../window_components/WindowWrapper";
import { useEffect, useRef, useState } from "react";
import { Size, WindowType } from "@/utils/types";

export default function DragableContainer() {
  const { windows, addWindow, setDeskSize } = useWindow();
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = constraintsRef.current;

    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDeskSize({ w: Math.round(width), h: Math.round(height) });
    });
    addWindow(WindowType.Calendar);

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={constraintsRef}
      className='w-full h-full relative  overflow-hidden '>
      {windows.map((custom_window) => (
        <WindowWrapper
          key={custom_window.id}
          custom_window={custom_window}
          constraintsRef={constraintsRef}
        />
      ))}
    </div>
  );
}

"use client";

import { useWindow } from "@/hooks/useWindow";
import WindowWrapper from "../window_components/WindowWrapper";
import { useEffect, useRef } from "react";
import { WindowType } from "@/utils/types";

export default function DragableContainer() {
  const { windows, addWindow } = useWindow();
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addWindow(WindowType.Calendar);
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

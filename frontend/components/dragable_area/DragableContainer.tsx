"use client";

import { useWindowContext } from "@/app/context/Window/WindowContext";
import WindowWrapper from "../window_components/WindowWrapper";
import { useEffect } from "react";

export default function DragableContainer() {
  const { windows, addWindow } = useWindowContext();
  useEffect(() => {
    addWindow("calendar");
    addWindow("calendar");
  }, []);
  return (
    <div className='w-full h-full relative'>
      {windows.map((custom_window) => (
        <WindowWrapper key={custom_window.id} custom_window={custom_window} />
      ))}
    </div>
  );
}

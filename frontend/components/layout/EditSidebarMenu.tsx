"use client";

import React, { useState } from "react";
import { useWindowContext } from "@/app/context/Window/WindowContext";

export default function EditSidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { addWindow } = useWindowContext();
  

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='absolute top-4 right-4 z-50 bg-primary text-white px-3 py-2 rounded-md shadow'>
        Eddit
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed top-[header-height] right-0 h-[calc(100vh-header-height)] w-64 bg-accent border-r shadow-lg
        transform transition-transform duration-300 z-40 rounded-xl
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}>
        <div className='p-4 space-y-4'>
          <h2 className='font-semibold text-lg text-white'>Widgets</h2>

          <button
            className='w-full bg-muted hover:bg-muted/70 rounded p-2 text-left'
            onClick={() => addWindow("calendar")}>
            Add Calendar
          </button>

          <button
            className='w-full bg-muted hover:bg-muted/70 rounded p-2 text-left'
            // onClick={() => addWindow("chat")}
          >
            Add Chat
          </button>

          <button
            className='w-full bg-muted hover:bg-muted/70 rounded p-2 text-left'
            // onClick={() => addWindow("chart")}
          >
            Add Chart
          </button>

          <button
            className='w-full bg-muted hover:bg-muted/70 rounded p-2 text-left'
            // onClick={() => addWindow("todo")}
          >
            Add Todo
          </button>
          <button
            className='w-full bg-muted hover:bg-muted/70 rounded p-2 text-left'
            // onClick={() => addWindow("custom_window")}
          >
            Add Custom Window
          </button>
        </div>
      </div>
    </>
  );
}

"use client";

import { useWindow } from "@/hooks/useWindow";
import { WindowType } from "@/utils/types";

export default function EditSidebarMenu() {
  const { addWindow, isEdditMode } = useWindow();

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
        fixed top-[header-height] right-0 h-[calc(100vh-header-height)] w-64 bg-accent border-r shadow-lg
        transform transition-transform duration-300 z-40 rounded-xl
        ${isEdditMode ? "translate-x-0" : "translate-x-full"}
        `}>
        <div className='p-4 space-y-4'>
          <h2 className='font-semibold text-lg text-white'>Widgets</h2>

          <button
            className='w-full bg-muted hover:bg-muted/70 rounded p-2 text-left'
            onClick={() => addWindow(WindowType.Calendar)}>
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

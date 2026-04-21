"use client";

import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import WindowRender from "./WindowRender";
import { useWindow } from "@/hooks/useWindow";
import { useSnap } from "@/hooks/useSnap";
import clsx from "clsx";
import { WindowState } from "@/utils/types";
import WindowHeader from "./WindowHeader";

type Props = {
  custom_window: WindowState;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
};

const WIDGET_TITLES: Record<string, string> = {
  todo: "Задачи",
  calendar: "Календарь",
  notes: "Заметки",
  pomodoro: "Помодоро",
  habits: "Привычки",
};

const SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 38,
  mass: 0.8,
};

export default function WindowWrapper({ custom_window }: Props) {
  const { id, position: pos, size } = custom_window;

  const {
    acctiveWindowId,
    focusWindow,
    deskSize,
    setSnapGuides,
    moveWindow,
    clearSnapGuides,
  } = useWindow();

  const { snap } = useSnap();

  // const [isFullscreen, setIsFullscreen] = useState(false);

  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const handleMove = useCallback(
    (e: PointerEvent) => {
      if (!dragStart.current) return;

      const clamped = {
        x: Math.max(
          0,
          Math.min(e.clientX - dragStart.current.x, deskSize.w - size.w)
        ),
        y: Math.max(
          0,
          Math.min(e.clientY - dragStart.current.y, deskSize.h - size.h)
        ),
      };

      const { pos: snapped, guideX, guideY } = snap(clamped, size, deskSize);

      setSnapGuides({ x: guideX, y: guideY });
      moveWindow(id, snapped);
    },
    [deskSize, size, snap, setSnapGuides, moveWindow, id]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUp = () => {
    dragStart.current = null;
    clearSnapGuides();

    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
  };

  // 👉 DOWN (ТОЛЬКО НА HEADER)
  const onTitlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("[data-nodrag]")) return;

      e.preventDefault();

      dragStart.current = {
        x: e.clientX - pos.x,
        y: e.clientY - pos.y,
      };

      focusWindow(id);

      // 🔥 ВАЖНО — вешаем на window
      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
    },
    [pos, id, focusWindow, handleMove, handleUp]
  );

  return (
    <motion.div
      className={clsx(
        "absolute flex flex-col overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-150",
        acctiveWindowId === id
          ? " border- shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
          : "border-border-subtle shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
      )}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={SPRING}
      style={{
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        zIndex: custom_window.zIndex,
      }}
      onPointerDown={() => focusWindow(id)}>
      {/* HEADER */}

      <div
        className='h-9 shrink-0 flex items-center gap-2 px-3 cursor-grab active:cursor-grabbing bg-surface border-b border-border-subtle'
        onPointerDown={onTitlePointerDown}>
        <div className='flex gap-[5px] shrink-0' data-nodrag='true'>
          <TrafficDot color='#FF5F57' onClick={() => {}} />
          <TrafficDot color='#FEBC2E' onClick={() => {}} />
          <TrafficDot color='#27C840' onClick={() => {}} />
        </div>

        <span className='flex-1 text-center text-[11px] font-medium text-white pointer-events-none pr-[52px]'>
          {WIDGET_TITLES[custom_window.type]}
        </span>
      </div>

      <div className='flex-1 overflow-auto bg-accent p-2'>
        <WindowRender window={custom_window} />
      </div>
    </motion.div>
  );
}

function TrafficDot({
  color,
  onClick,
}: {
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className='w-[11px] h-[11px] rounded-full hover:brightness-75 transition-[filter] duration-100 shrink-0'
      style={{ backgroundColor: color }}
    />
  );
}

{
  /* {!isFullscreen && (
          <div
            onMouseDown={(e) => {
              e.preventDefault();

              const startX = e.clientX;
              const startY = e.clientY;

              const startWidth = size.w;
              const startHeight = size.h;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                setSize({
                  w: Math.max(250, startWidth + (moveEvent.clientX - startX)),
                  h: Math.max(200, startHeight + (moveEvent.clientY - startY)),
                });
              };

              const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
              };

              window.addEventListener("mousemove", handleMouseMove);
              window.addEventListener("mouseup", handleMouseUp);
            }}
            className='w-4 h-4 bg-gray-300 absolute bottom-0 right-0 cursor-se-resize'
          />
        )} */
}

/* 🔵 SNAP PREVIEW
      {preview && (
        <div
          className='absolute border-2 border-blue-500 bg-blue-200/20 rounded-xl pointer-events-none'
          style={{
            left: preview.x,
            top: preview.y,
            width: size.w,
            height: size.h,
          }}
        />
      )}

      {/* 📏 SNAP GUIDES */

// {guides.x !== null && (
//   <div
//     className='absolute top-0 bottom-0 w-[1px] bg-blue-400 pointer-events-none z-[999]'
//     style={{ left: guides.x }}
//   />
// )}
// {guides.y !== null && (
//   <div
//     className='absolute left-0 right-0 h-[1px] bg-blue-400 pointer-events-none z-[999]'
//     style={{ top: guides.y }}
//   />
// )} */}

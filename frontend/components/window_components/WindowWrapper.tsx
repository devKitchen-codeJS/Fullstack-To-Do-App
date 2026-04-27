"use client";

import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import WindowRender from "./WindowRender";
import { useWindow } from "@/hooks/useWindow";
import { useSnap } from "@/hooks/useSnap";
import clsx from "clsx";
import { Vector, WindowState } from "@/utils/types";
import WindowHeader from "./WindowHeader";

type Props = {
  custom_window: WindowState;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
};

const WIDGET_TITLES: Record<string, string> = {
  todo: "Tasks",
  calendar: "Calendar",
  notes: "Notes",
  pomodoro: "Pomodoro",
  habits: "Habbits",
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

  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const onTitlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("[data-nodrag]")) return;
      e.preventDefault();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      focusWindow(id);
    },
    [pos, id, focusWindow]
  );

  const onTitlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragStart.current) return;
      const clamped: Vector = {
        x: Math.max(
          0,
          Math.min(e.clientX - dragStart.current.x, deskSize.w - size.w)
        ),
        y: Math.max(
          0,
          Math.min(e.clientY - dragStart.current.y, deskSize.h - 40)
        ),
      };
      const { pos: snapped, guideX, guideY } = snap(clamped, size, deskSize);
      const guides = { guideX, guideY };
      setSnapGuides(guides);
      moveWindow(id, snapped);
    },
    [id, size, deskSize, snap, setSnapGuides, moveWindow]
  );

  const onTitlePointerUp = useCallback(() => {
    dragStart.current = null;
    clearSnapGuides();
  }, [clearSnapGuides]);

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
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onPointerLeave={onTitlePointerUp}>
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

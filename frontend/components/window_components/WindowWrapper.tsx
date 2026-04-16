"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import WindowHeader from "../window_components/WindowHeader";
import { WindowState } from "@/utils/types";
import WindowRender from "./WindowRender";
import { useWindow } from "@/hooks/useWindow";
import { useSnap } from "@/hooks/useSnap";

type Props = {
  custom_window: WindowState;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
};

export default function WindowWrapper({
  custom_window,
  constraintsRef,
}: Props) {
  const { updateWindow, bringToFront } = useWindow();
  const { isEdditMode } = useWindow();
  const { getSnap } = useSnap();

  const [size, setSize] = useState(custom_window.size);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [preview, setPreview] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [guides, setGuides] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  return (
    <>
      {/* 🔵 SNAP PREVIEW */}
      {preview && (
        <div
          className='absolute border-2 border-blue-500 bg-blue-200/20 rounded-xl pointer-events-none'
          style={{
            left: preview.x,
            top: preview.y,
            width: size.width,
            height: size.height,
          }}
        />
      )}

      {/* 📏 SNAP GUIDES */}
      {guides.x !== null && (
        <div
          className='absolute top-0 bottom-0 w-[1px] bg-blue-400 pointer-events-none z-[999]'
          style={{ left: guides.x }}
        />
      )}
      {guides.y !== null && (
        <div
          className='absolute left-0 right-0 h-[1px] bg-blue-400 pointer-events-none z-[999]'
          style={{ top: guides.y }}
        />
      )}

      <motion.div
        drag={isEdditMode}
        dragConstraints={constraintsRef}
        dragMomentum={false}
        onDrag={(e, info) => {
          if (!constraintsRef.current) return;

          const rect = constraintsRef.current.getBoundingClientRect();

          const rawX = custom_window.position.x + info.offset.x;
          const rawY = custom_window.position.y + info.offset.y;

          const clampedX = Math.min(Math.max(0, rawX), rect.width - size.width);

          const clampedY = Math.min(
            Math.max(0, rawY),
            rect.height - size.height
          );

          const { pos, guideX, guideY } = getSnap(
            clampedX,
            clampedY,
            rect,
            custom_window.size
          );

          if (guideX !== null || guideY !== null) {
            setPreview(pos);
          } else {
            setPreview(null);
          }

          setGuides({ x: guideX, y: guideY });
        }}
        onDragEnd={(e, info) => {
          if (!constraintsRef.current) return;

          const rect = constraintsRef.current.getBoundingClientRect();

          const rawX = custom_window.position.x + info.offset.x;
          const rawY = custom_window.position.y + info.offset.y;

          const clampedX = Math.min(Math.max(0, rawX), rect.width - size.width);

          const clampedY = Math.min(
            Math.max(0, rawY),
            rect.height - size.height
          );

          const { pos } = getSnap(clampedX, clampedY, rect, custom_window.size);

          updateWindow(custom_window.id, {
            position: pos,
          });

          setPreview(null);
          setGuides({ x: null, y: null });
        }}
        animate={{
          x: isFullscreen ? 0 : custom_window.position.x,
          y: isFullscreen ? 0 : custom_window.position.y,
          width: isFullscreen ? "80vw" : size.width,
          height: isFullscreen ? "90vh" : size.height,
        }}
        whileDrag={{
          boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
        }}
        style={{ position: "absolute", zIndex: custom_window.zIndex }}
        className='bg-green-300 rounded-xl shadow-xl flex flex-col overflow-hidden'
        onMouseDown={() => bringToFront(custom_window.id)}>
        <WindowHeader
          title={custom_window.type}
          setIsFullscreen={setIsFullscreen}
          dragging={false}
          isFullscreen={isFullscreen}
        />

        <div className='flex-1 overflow-auto'>
          <WindowRender window={custom_window} />
        </div>

        {!isFullscreen && (
          <div
            onMouseDown={(e) => {
              e.preventDefault();

              const startX = e.clientX;
              const startY = e.clientY;

              const startWidth = size.width;
              const startHeight = size.height;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                setSize({
                  width: Math.max(
                    250,
                    startWidth + (moveEvent.clientX - startX)
                  ),
                  height: Math.max(
                    200,
                    startHeight + (moveEvent.clientY - startY)
                  ),
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
        )}
      </motion.div>
    </>
  );
}

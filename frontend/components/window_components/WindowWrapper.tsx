"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import WindowHeader from "../window_components/WindowHeader";
import { WindowState } from "@/utils/types";
import WindowRender from "./WindowRender";
import { useWindow } from "@/hooks/useWindow";

type Props = {
  custom_window: WindowState;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
};

export default function WindowWrapper({
  custom_window,
  constraintsRef,
}: Props) {
  const { isEdditMode } = useWindow();

  const [position, setPosition] = useState(custom_window.position);

  const [size, setSize] = useState(custom_window.size);

  const [dragging, setDragging] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <motion.div
      drag={isEdditMode}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        if (!constraintsRef) return;
        const container = constraintsRef.current;
        console.log("constraintsRef", constraintsRef);
        if (!container) return;

        const rect = container.getBoundingClientRect();
        console.log("rect", rect);

        const newX = Math.min(
          Math.max(0, position.x + info.offset.x),
          rect.width - size.width
        );

        const newY = Math.min(
          Math.max(0, position.y + info.offset.y),
          rect.height - size.height
        );

        setPosition({ x: newX, y: newY });

        // setPosition({
        //   x: position.x + info.offset.x,
        //   y: position.y + info.offset.y,
        // });
      }}
      animate={{
        x: isFullscreen ? 0 : position.x,
        y: isFullscreen ? 0 : position.y,
        width: isFullscreen ? "80vw" : size.width,
        height: isFullscreen ? "90vh" : size.height,
      }}
      whileDrag={{
        scale: 1.1,
        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      }}
      style={{ position: "absolute" }}
      className='bg-green-300 rounded-xl shadow-xl flex flex-col overflow-hidden'>
      <WindowHeader
        title='Window'
        setDragging={setDragging}
        setIsFullscreen={setIsFullscreen}
        dragging={dragging}
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
                width: Math.max(250, startWidth + (moveEvent.clientX - startX)),
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
  );
}

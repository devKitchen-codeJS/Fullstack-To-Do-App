"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import WindowHeader from "../window_components/WindowHeader";
import { WindowState } from "@/utils/types";
import WindowRender from "./WindowRender";

type Props = {
    custom_window: WindowState;
};

export default function WindowWrapper({ custom_window }: Props) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState(custom_window.position);

  const [size, setSize] = useState(custom_window.size);

  const [dragging, setDragging] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragListener={dragging}
      onDragEnd={(e, info) => {
        setPosition({
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        });
      }}
      animate={{
        x: isFullscreen ? 0 : position.x,
        y: isFullscreen ? 0 : position.y,
        width: isFullscreen ? "100vw" : size.width,
        height: isFullscreen ? "100vh" : size.height,
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

import { useWindow } from "@/hooks/useWindow";
import React from "react";

interface WindowHeaderProps {
  title: string;
  // setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  dragging: boolean;
  // isFullscreen: boolean;

  // 👇 ДОБАВЛЯЕМ ЭТИ ПРОПСЫ
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
  // onPointerMove?: (e: React.PointerEvent<HTMLDivElement>) => void;
  // onPointerUp?: (e: React.PointerEvent<HTMLDivElement>) => void;
  // onPointerLeave?: (e: React.PointerEvent<HTMLDivElement>) => void;
}

const WindowHeader = ({
  title,
  // setIsFullscreen,
  // isFullscreen,
  onPointerDown,
}: // onPointerMove,
// onPointerUp,
// onPointerLeave,
WindowHeaderProps) => {
  const { isEdditMode } = useWindow();

  return (
    <div
      className='bg-primary px-4 py-2 flex justify-between items-center cursor-grab active:cursor-grabbing select-none'
      onPointerDown={onPointerDown}>
      <span className='font-medium text-white'>{title}</span>

      <div className='flex gap-2' data-nodrag>
        <button
          // onClick={() => setIsFullscreen(!isFullscreen)}
          className='px-2 py-1 text-xs bg-blue-500 text-white rounded'
          data-nodrag>
          ⛶
        </button>

        <button
          className='px-2 py-1 text-xs bg-yellow-500 text-white rounded'
          data-nodrag>
          —
        </button>

        <button
          className='px-2 py-1 text-xs bg-red-500 text-white rounded'
          data-nodrag>
          ✕
        </button>
      </div>
    </div>
  );
};

export default WindowHeader;

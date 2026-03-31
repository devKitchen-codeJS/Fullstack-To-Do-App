import { useWindow } from "@/hooks/useWindow";
import React from "react";
interface WindowHeaderProps {
  title: string;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  dragging: boolean;
  isFullscreen: boolean;
}
const WindowHeader = (props: WindowHeaderProps) => {
  const { title, setIsFullscreen, isFullscreen } = props;
  const { isEdditMode } = useWindow();

  return (
    <div>
      {/* Header */}
      <div
        className='bg-gray-300 px-4 py-2 flex justify-between items-center cursor-grab active:cursor-grabbing select-none'
        onPointerDown={(e) => {
          e.stopPropagation();
        }}>
        <span className='font-medium'>{title}</span>

        <div className='flex gap-2'>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className='px-2 py-1 text-xs bg-blue-500 text-white rounded'>
            ⛶
          </button>

          <button className='px-2 py-1 text-xs bg-yellow-500 text-white rounded'>
            —
          </button>

          <button className='px-2 py-1 text-xs bg-red-500 text-white rounded'>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default WindowHeader;

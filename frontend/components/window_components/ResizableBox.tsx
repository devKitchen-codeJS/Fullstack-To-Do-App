'use client';
import { useWindowContext } from "@/app/context/Window/WindowContext";
import React, { useRef, useState } from "react";

export default function ResizableBox({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

type Position = {
    x: number;
    y: number;
  };
  
  type Size = {
    width: number;
    height: number;
  };
  const boxRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [size, setSize] = useState<Size>({ width: 400, height: 300 });

  const {updateWindow} = useWindowContext();

  return (
    <div
      className='w-full h-full border border-2-black rounded bg-muted flex justify-center items-center resize  '
      style={{ resize: "both", overflow: "auto" }}>
      {children}
    </div>
  );
}

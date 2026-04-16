import { useWindow } from "@/hooks/useWindow";
import { WindowState } from "@/utils/types";
import React from "react";

type PositionSnappableWindow = {
  newX: number;
  newY: number;
  custom_window: WindowState;
};

const SnapWindow = (props: PositionSnappableWindow) => {
  const { newX, newY, custom_window } = props;
  const { windows } = useWindow();
  const SNAP_DISTANCE = 10;

  let snappedX = newX;
  let snappedY = newY;

  windows.forEach((w) => {
    if (w.id === custom_window.id) return;

    const otherX = w.position.x;
    const otherY = w.position.y;
    const otherW = w.size.width;
    const otherH = w.size.height;

    // 👉 SNAP LEFT
    if (Math.abs(newX - (otherX + otherW)) < SNAP_DISTANCE) {
      snappedX = otherX + otherW;
    }

    // 👉 SNAP RIGHT
    if (Math.abs(newX + custom_window.size.width - otherX) < SNAP_DISTANCE) {
      snappedX = otherX - custom_window.size.width;
    }

    // 👉 SNAP TOP
    if (Math.abs(newY - (otherY + otherH)) < SNAP_DISTANCE) {
      snappedY = otherY + otherH;
    }

    // 👉 SNAP BOTTOM
    if (Math.abs(newY + custom_window.size.height - otherY) < SNAP_DISTANCE) {
      snappedY = otherY - custom_window.size.height;
    }
  });

  return { x: snappedX, y: snappedY };
};

export default SnapWindow;

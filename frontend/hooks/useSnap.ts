import { useCallback } from "react";

type Size = {
  width: number;
  height: number;
};

export const useSnap = () => {
  const EDGE_SNAP = 20;
  const CENTER_SNAP = 12;
  //SNAP FUNCTION
  const getSnap = useCallback(
    (x: number, y: number, rect: DOMRect, size: Size) => {
      let snappedX = x;
      let snappedY = y;

      let guideX: number | null = null;
      let guideY: number | null = null;

      const W = size.width;
      const H = size.height;
      const CW = rect.width;
      const CH = rect.height;

      // X axis
      if (x < EDGE_SNAP) {
        snappedX = 0;
        guideX = 0;
      } else if (Math.abs(x + W / 2 - CW / 2) < CENTER_SNAP) {
        snappedX = CW / 2 - W / 2;
        guideX = CW / 2;
      } else if (Math.abs(x + W - CW) < EDGE_SNAP) {
        snappedX = CW - W;
        guideX = CW;
      }

      // Y axis
      if (y < EDGE_SNAP) {
        snappedY = 0;
        guideY = 0;
      } else if (Math.abs(y + H / 2 - CH / 2) < CENTER_SNAP) {
        snappedY = CH / 2 - H / 2;
        guideY = CH / 2;
      } else if (Math.abs(y + H - CH) < EDGE_SNAP) {
        snappedY = CH - H;
        guideY = CH;
      }

      return {
        pos: { x: snappedX, y: snappedY },
        guideX,
        guideY,
      };
    },
    []
  );

  return { getSnap };
};

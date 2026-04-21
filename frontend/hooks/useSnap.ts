import { useCallback } from "react";
import { useWindow } from "./useWindow";
import { Size, Vector } from "@/utils/types";

export const useSnap = () => {
  const EDGE_SNAP = 20;
  const CENTER_SNAP = 12;

  const { setSnapGuides, clearSnapGuides } = useWindow();
  //SNAP FUNCTION

  const snap = useCallback(
    (
      pos: Vector,
      size: Size,
      deskSize: Size
    ): { pos: Vector; guideX: number | null; guideY: number | null } => {
      let { x, y } = pos;
      const { w, h } = size;
      const { w: DW, h: DH } = deskSize;
      let guideX: number | null = null;
      let guideY: number | null = null;

      // X axis
      if (x < EDGE_SNAP) {
        x = 0;
        guideX = 0;
      } else if (Math.abs(x + w / 2 - DW / 2) < CENTER_SNAP) {
        x = DW / 2 - w / 2;
        guideX = DW / 2;
      } else if (Math.abs(x + w - DW) < EDGE_SNAP) {
        x = DW - w;
        guideX = DW;
      }

      // Y axis
      if (y < EDGE_SNAP) {
        y = 0;
        guideY = 0;
      } else if (Math.abs(y + h / 2 - DH / 2) < CENTER_SNAP) {
        y = DH / 2 - h / 2;
        guideY = DH / 2;
      } else if (Math.abs(y + h - DH) < EDGE_SNAP) {
        y = DH - h;
        guideY = DH;
      }

      return { pos: { x, y }, guideX, guideY };
    },
    []
  );

  return { snap, setSnapGuides, clearSnapGuides };
};

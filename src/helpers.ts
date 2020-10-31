import { Position } from "./types";

export const dx = (p1: Position, p2: Position): number => {
  return  p2.x - p1.x;
}

export const dy = (p1: Position, p2: Position): number => {
  return  p2.y - p1.y;
}

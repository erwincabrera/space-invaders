import * as Constants from "./Constants";
import { Invader, Position } from "./types";

export const isHit = (invader: Invader, shot: Position): boolean => {
  return shot.x - invader.geo.pos.x <= invader.geo.width &&
    shot.x - invader.geo.pos.x >= -Constants.SHOT_WIDTH &&
    shot.y - invader.geo.pos.y <= invader.geo.height &&
    shot.y - invader.geo.pos.y >= -(Constants.SHOT_DY - invader.geo.height + Constants.INVADER_DY)
}

export const isWithinBounds = (pos: Position, width: number, height: number, maxWidth: number, maxHeight: number): boolean => {
  return pos.y + height < maxHeight &&
    pos.y > 0 &&
    pos.x + width < maxWidth &&
    pos.x > 0;
}

export const dx = (p1: Position, p2: Position): number => {
  return  p2.x - p1.x;
}

export const dy = (p1: Position, p2: Position): number => {
  return  p2.y - p1.y;
}

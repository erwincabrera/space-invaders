import * as Constants from "./Constants";
import { Geometry, Invader, Position, Shot, State } from "./types";

export const isOverlapping = (a: Geometry, b: Geometry): boolean => {
  return b.pos.x - a.pos.x <= a.width &&
    b.pos.x - a.pos.x >= -b.width &&
    b.pos.y - a.pos.y <= a.height &&
    b.pos.y - a.pos.y >= -b.height
}

// takes into account possible "misses" due to discrete shot and invader movements
export const isHit = (invader: Invader, shot: Shot): boolean => {
  return shot.geo.pos.x - invader.geo.pos.x <= invader.geo.width &&
    shot.geo.pos.x - invader.geo.pos.x >= -Constants.SHOT_WIDTH &&
    shot.geo.pos.y - invader.geo.pos.y <= invader.geo.height &&
    shot.geo.pos.y - invader.geo.pos.y >= -(Constants.SHOT_DY - invader.geo.height + Constants.INVADER_DY)
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

export const isGameOver = (state: State): boolean => {
  return state.invaders
    .map(eachInvader => eachInvader.geo)
    .some(eachInvaderGeo => isOverlapping(state.player.geo, eachInvaderGeo))
}

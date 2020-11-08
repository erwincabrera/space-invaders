import * as Constants from "./Constants";
import { isOverlapping } from "./Geometry";
import { Invader, Shot, State } from "./types";

export const getRandom = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
}

// takes into account possible "misses" due to discrete shot and invader movements
export const isHit = (invader: Invader, shot: Shot): boolean => {
  return shot.geo.pos.x - invader.geo.pos.x <= invader.geo.width &&
    shot.geo.pos.x - invader.geo.pos.x >= -Constants.SHOT_WIDTH &&
    shot.geo.pos.y - invader.geo.pos.y <= invader.geo.height &&
    shot.geo.pos.y - invader.geo.pos.y >= -(Constants.SHOT_DY - invader.geo.height + Constants.INVADER_DY)
}

export const isGameOver = (state: State): boolean => {
  return state.invaders
    .map(eachInvader => eachInvader.geo)
    .some(eachInvaderGeo => isOverlapping(state.player.geo, eachInvaderGeo))
}

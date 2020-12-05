import { isOverlapping } from "./Geometry";
import { Invader, Shot, State } from "./types";

export const getRandom = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
}

export const isHit = (invader: Invader, shot: Shot): boolean => {
  return isOverlapping(invader.geo, shot.geo);
}

export const isGameOver = (state: State): boolean => {
  return state.invaders
    .map(eachInvader => eachInvader.geo)
    .some(eachInvaderGeo => isOverlapping(state.player.geo, eachInvaderGeo))
}

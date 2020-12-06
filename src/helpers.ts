import { Invader } from "./types";
import * as Constants from './Constants';

export const getRandom = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
}

export const getRandomInvader = (): Invader => {
  const width = 20;
  const height = 20;

  return {
    geo: {
      pos: {
        x: getRandom(0 + width / 2, Constants.WIDTH - width / 2),
        y: 0
      },
      width,
      height
    },
    hp: 1,
    score: 1
  }
}

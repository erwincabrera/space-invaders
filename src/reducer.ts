import { Action, State } from "./types"
import * as Constants from './Constants'

export const initialState: State = {
  pos: {
    x: 100,
    y: 100
  },
  shots: [],
  invaders: []
};

export const reducer = (state: State, action: Action<any>): State => {
  switch (action.type) {
    case 'MOVE':
      return {
        ...state,
        pos: {
          ...state.pos,
          x: state.pos.x + action.payload.dx,
          y: state.pos.y + action.payload.dy
        }
      }
    case 'FIRE':
      return {
        ...state,
        shots: state.shots.concat([{ x: state.pos.x, y: state.pos.y }])
      }
    case 'TICK':
      return {
        ...state,
        shots: state.shots
          .map(eachShot => ({ ...eachShot, y: eachShot.y - Constants.SHOT_DY }))
          .filter(eachShot => eachShot.y > 0),
        invaders: state.invaders
          .map(eachInvader => ({
            ...eachInvader,
            pos: {
              ...eachInvader.pos,
              y: eachInvader.pos.y + Constants.INVADER_DY
            }
          }))
          .filter(eachInvader => eachInvader.pos.y < 600)
          .filter(eachInvader => !state.shots.some(eachShot =>
            Math.abs(eachShot.x - eachInvader.pos.x) < 50 &&
            Math.abs(eachShot.y - eachInvader.pos.y) < 50
          )
          )
      }
    case 'CREATE_INVADER':
      return {
        ...state,
        invaders: state.invaders.concat([{ pos: action.payload }])
      }
    default:
      return initialState;
  }
}
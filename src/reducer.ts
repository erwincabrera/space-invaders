import { Action, MovePayload, State } from "./types"
import * as Constants from './Constants'

export const initialState: State = {
  player: {
    pos: {
      x: 100,
      y: 100
    },
    width: 75,
    height: 75
  },
  shots: [],
  invaders: []
};

const move = (state: State, action: Action<MovePayload>): State => {
  return {
    ...state,
    player: {
      ...state.player,
      pos: {
        x: state.player.pos.x + action.payload.dx,
        y: state.player.pos.y + action.payload.dy
      }
    }
  }
}

const fire = (state: State, action: Action<any>): State => {
  return {
    ...state,
    shots: [
      ...state.shots,
      {
        x: state.player.pos.x + state.player.width / 2 - Constants.SHOT_WIDTH / 2,
        y: state.player.pos.y
      }
    ]
  }
}

const tick = (state: State, action: Action<any>): State => {
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
        Math.abs(eachShot.x - eachInvader.pos.x) < eachInvader.width &&
        eachShot.y - eachInvader.pos.y < eachInvader.height
      ))
  }
}

const createInvader = (state: State, action: Action<any>): State => {
  return {
    ...state,
    invaders: state.invaders.concat([{
      pos: action.payload.pos,
      width: action.payload.width,
      height: action.payload.height
    }])
  }
}

export const reducer = (state: State, action: Action<any>): State => {
  switch (action.type) {
    case 'MOVE':
      return move(state, action)
    case 'FIRE':
      return fire(state, action)
    case 'TICK':
      return tick(state, action)
    case 'CREATE_INVADER':
      return createInvader(state, action)
    default:
      return initialState;
  }
}

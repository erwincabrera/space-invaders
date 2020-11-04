import { Action, Invader, MovePayload, State, Position } from "./types"
import * as Constants from './Constants'

export const initialState: State = {
  isStarted: false,
  player: {
    pos: {
      x: 100,
      y: 100
    },
    cooldown: 0,
    width: 75,
    height: 75
  },
  shots: [],
  invaders: []
};

const move = (state: State, action: Action<MovePayload>): State => {
  const player = state.player;
  const newPos = {
    x: state.player.pos.x + action.payload.dx,
    y: state.player.pos.y + action.payload.dy
  }

  if (isWithinBounds(newPos, player.width, player.height, Constants.WIDTH, Constants.HEIGHT)) {
    return {
      ...state,
      player: {
        ...state.player,
        pos: newPos
      }
    }
  }

  return state  
}

const fire = (state: State, action: Action<any>): State => {
  return {
    ...state,
    player: {
      ...state.player,
      cooldown: state.player.cooldown < 0 
          ? Constants.SHOT_COOLDOWN 
          : state.player.cooldown
    },
    shots: state.player.cooldown < 0
      ? [
        ...state.shots,
        {
          x: state.player.pos.x + state.player.width / 2 - Constants.SHOT_WIDTH / 2,
          y: state.player.pos.y
        }
      ]
      : state.shots
  }
}

const tick = (state: State, action: Action<any>): State => {
  const invaderHit = (invader: Invader) => state.shots.some(eachShot => isHit(invader, eachShot));
  const shotHit = (shot: Position) => state.invaders.some(eachInvader => isHit(eachInvader, shot));

  const newHp = (invader: Invader) => 
    invader.hp > 0 && invaderHit(invader)
      ? invader.hp - 1 
      : invader.hp

  return {
    ...state,
    player: {
      ...state.player,
      cooldown: state.player.cooldown - 1
    },
    shots: state.shots
      .filter(eachShot => eachShot.y > 0)
      .filter(eachShot => !shotHit(eachShot))
      .map(eachShot => ({ ...eachShot, y: eachShot.y - Constants.SHOT_DY })),
    invaders: state.invaders
      .filter(eachInvader => eachInvader.pos.y + eachInvader.height < Constants.HEIGHT)
      .filter(eachInvader => eachInvader.hp > 0)
      .map(eachInvader => ({
        ...eachInvader,
        pos: {
          ...eachInvader.pos,
          y: newHp(eachInvader) > 0 ? eachInvader.pos.y + Constants.INVADER_DY : eachInvader.pos.y
        },
        hp: newHp(eachInvader)
      }))
  }
}

const createInvader = (state: State, action: Action<any>): State => {
  return {
    ...state,
    invaders: state.invaders.concat([{
      pos: action.payload.pos,
      width: action.payload.width,
      height: action.payload.height,
      hp: 1
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

const isHit = (invader: Invader, shot: Position): boolean => {
  return shot.x - invader.pos.x <= invader.width &&
    shot.x - invader.pos.x >= -Constants.SHOT_WIDTH &&
    shot.y - invader.pos.y <= invader.height &&
    shot.y - invader.pos.y >= -(Constants.SHOT_DY - invader.height + Constants.INVADER_DY)
}

const isWithinBounds = (pos: Position, width: number, height: number, maxWidth: number, maxHeight: number): boolean => {
  return pos.y + height < maxHeight &&
          pos.y > 0 &&
          pos.x + width < maxWidth &&
          pos.x > 0;
}

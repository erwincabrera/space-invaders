import { Action, Invader, MovePayload, State, Shot } from "./types"
import * as Constants from './Constants'
import { isGameOver, isHit } from "./helpers";
import { isWithinBounds } from "./Geometry";

export const initialState: State = {
  isStarted: false,
  player: {
    geo: {
      width: 75,
      height: 75,
      pos: {
        x: 100,
        y: 100
      },
    },
    cooldown: 0
  },
  shots: [],
  invaders: []
};

const move = (state: State, action: Action<MovePayload>): State => {
  const player = state.player;
  const newGeo = {
    ...player.geo,
    pos: {
      ...player.geo.pos,
      x: state.player.geo.pos.x + action.payload.dx,
      y: state.player.geo.pos.y + action.payload.dy
    }
  }

  if (isWithinBounds(newGeo, Constants.WIDTH, Constants.HEIGHT)) {
    return {
      ...state,
      player: {
        ...state.player,
        geo: newGeo
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
          geo: {
            pos: {
              x: state.player.geo.pos.x + state.player.geo.width / 2 - Constants.SHOT_WIDTH / 2,
              y: state.player.geo.pos.y
            },
            width: Constants.SHOT_WIDTH,
            height: Constants.SHOT_HEIGHT
          }
        }
      ]
      : state.shots
  }
}

const tick = (state: State, action: Action<any>): State => {
  const invaderHit = (invader: Invader) => state.shots.some(eachShot => isHit(invader, eachShot));
  const shotHit = (shot: Shot) => state.invaders.some(eachInvader => isHit(eachInvader, shot));

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
      .filter(eachShot => eachShot.geo.pos.y > 0)
      .filter(eachShot => !shotHit(eachShot))
      .map(eachShot => ({
        ...eachShot, 
        geo: {
          ...eachShot.geo, 
          pos: {
            ...eachShot.geo.pos,
            y: eachShot.geo.pos.y - Constants.SHOT_DY
          }
        }
      })),
    invaders: state.invaders
      .filter(eachInvader => eachInvader.geo.pos.y + eachInvader.geo.height < Constants.HEIGHT)
      .filter(eachInvader => eachInvader.hp > 0)
      .map(eachInvader => ({
        ...eachInvader,
        geo: {
          ...eachInvader.geo,
          pos: {
            ...eachInvader.geo.pos,
            y: newHp(eachInvader) > 0 ? eachInvader.geo.pos.y + Constants.INVADER_DY : eachInvader.geo.pos.y
          }
        },
        hp: newHp(eachInvader)
      }))
  }
}

const addInvader = (state: State, action: Action<Invader>): State => {  
  return {
    ...state,
    invaders: state.invaders.concat(action.payload)
  }
}

export const reducer = (state: State, action: Action<any>): State => {
  if (action.type === 'START') {
    return {...state, isStarted: true}
  }

  if (action.type === 'NEW_GAME') {
    return {...initialState, isStarted: true}
  }
  
  if (state.isStarted === false) {
    return state;
  }

  if (isGameOver(state)) {
    return state;
  }

  switch (action.type) {
    case 'MOVE':
      return move(state, action)
    case 'FIRE':
      return fire(state, action)
    case 'TICK':
      return tick(state, action)
    case 'ADD_INVADER':
      return addInvader(state, action)
    default:
      return initialState;
  }
}

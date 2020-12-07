import { Action, Invader, MovePayload, State, Shot, View } from "./types"
import * as Constants from './Constants'
import { isOverlapping, isWithinBounds } from "./Geometry";

export const initialState: State = {
  view: "Start",
  isStarted: false,
  score: 0,
  player: {
    geo: {
      width: 75,
      height: 75,
      pos: {
        x: Constants.WIDTH * 0.4,
        y: Constants.HEIGHT * 0.8
      },
    },
    cooldown: 0,
    hp: 1
  },
  shots: [],
  invaders: []
};

const start = (state: State): State => {
    return {...state, isStarted: true, view: "Game"}
}

const newGame = (state: State): State => {
  return {...initialState, isStarted: true, view: "Game"}
}

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
  if (state.isStarted === false) return state;

  if (state.player.hp <= 0) {
    return {
      ...state,
      view: "End",
      isStarted: false
    }
  }

  const invaderHit = (invader: Invader) => (
    state.shots.some(eachShot => isOverlapping(invader.geo, eachShot.geo))
  );

  const shotHit = (shot: Shot) => (
    state.invaders.some(eachInvader => isOverlapping(eachInvader.geo, shot.geo))
  );

  const playerHit = (): boolean => {
    return state.invaders
      .map(eachInvader => eachInvader.geo)
      .some(eachInvaderGeo => isOverlapping(state.player.geo, eachInvaderGeo))
  }

  const newPlayerHp = (): number => {
    const { hp } = state.player;
    return hp > 0 && playerHit() ? hp - 1 : hp
  }

  const newHp = (invader: Invader) => 
    invader.hp > 0 && invaderHit(invader)
      ? invader.hp - 1 
      : invader.hp

  const newInvaders = state.invaders
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

  return {
    ...state,
    player: {
      ...state.player,
      cooldown: state.player.cooldown - 1,
      hp: newPlayerHp()
    },
    score: state.score + newInvaders.reduce((acc, curr) => acc + (curr.hp === 0 ? curr.score : 0), 0),
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
    invaders: newInvaders
  }
}

const addInvader = (state: State, action: Action<Invader>): State => {  
  return {
    ...state,
    invaders: state.invaders.concat(action.payload)
  }
}

const setView = (state: State, action: Action<View>): State => {
  return {
    ...state,
    view: action.payload
  }
}

export const reducer = (state: State, action: Action<any>): State => {
  switch (action.type) {
    case 'START':
      return start(state)
    case 'NEW_GAME':
      return newGame(state)
    case 'MOVE':
      return move(state, action)
    case 'FIRE':
      return fire(state, action)
    case 'TICK':
      return tick(state, action)
    case 'ADD_INVADER':
      return addInvader(state, action)
    case 'SET_VIEW':
      return setView(state, action)
    default:
      return initialState;
  }
}

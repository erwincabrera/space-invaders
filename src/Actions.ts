import { Action, MovePayload } from "./types";
import { Geometry } from "./Geometry";
import * as Constants from "./Constants";

export const start = (): Action<any> => {
  return {
    type: 'START',
    payload: {}
  }
}

export const moveUp = (): Action<MovePayload> => {
  return {
    type: 'MOVE',
    payload: {
      dx: 0,
      dy: -Constants.DY
    }
  }
}

export const moveDown = (): Action<MovePayload> => {
  return {
    type: 'MOVE',
    payload: {
      dx: 0,
      dy: Constants.DY
    }
  }
}

export const moveLeft = (): Action<MovePayload> => {
  return {
    type: 'MOVE',
    payload: {
      dx: -Constants.DX,
      dy: 0
    }
  }
}

export const moveRight = (): Action<MovePayload> => {
  return {
    type: 'MOVE',
    payload: {
      dx: Constants.DX,
      dy: 0
    }
  }
}

export const fire = (): Action<any> => {
  return {
    type: 'FIRE',
    payload: {}
  }
}

export const tick = (): Action<any> => {
  return {
    type: 'TICK',
    payload: {}
  }
}

export const createInvader = (geo: Geometry): Action<any> => {
  return {
    type: 'CREATE_INVADER',
    payload: {
      pos: geo.pos, width: geo.width, height: geo.height
    }
  }
}

export const newGame = (): Action<any> => {
  return {
    type: 'NEW_GAME',
    payload: {}
  }
}

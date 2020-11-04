import { Action, MovePayload, Position } from "./types";
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

export const createInvader = (pos: Position, width: number, height: number): Action<any> => {
  return {
    type: 'CREATE_INVADER',
    payload: {
      pos, width, height
    }
  }
}

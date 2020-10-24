import { Action, MovePayload, Position } from "./types";
import * as Constants from "./Constants";

export const moveUp = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: 0, dy: -Constants.DY }
});

export const moveDown = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: 0, dy: Constants.DY }
});

export const moveLeft = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: -Constants.DX, dy: 0 }
});

export const moveRight = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: Constants.DX, dy: 0 }
})

export const fire = (): Action<any> => ({
  type: 'FIRE', payload: {}
})

export const tick = (): Action<any> => ({
  type: 'TICK', payload: {}
})

export const createInvader = (pos: Position): Action<Position> => ({
  type: 'CREATE_INVADER', payload: pos
})

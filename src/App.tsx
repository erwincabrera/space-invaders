import React, { useEffect, useReducer } from 'react';
import * as Constants from './Constants';
import Graph from './Graph';
import { Action, MovePayload, State, Position } from './types';

const initialState: State = {
  pos: {
    x: 100,
    y: 100
  },
  shots: [],
  invaders: []
};

const moveUp = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: 0, dy: -Constants.DY }
});

const moveDown = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: 0, dy: Constants.DY }
});

const moveLeft = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: -Constants.DX, dy: 0 }
});

const moveRight = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: Constants.DX, dy: 0 }
})

const fire = (): Action<any> => ({
  type: 'FIRE', payload: {}
})

const tick = (): Action<any> => ({
  type: 'TICK', payload: {}
})

const createInvader = (pos: Position): Action<Position> => ({
  type: 'CREATE_INVADER', payload: pos
}) 

const getRandomInvaderPosition = (min: number, max: number): Position => {
  return {
    x: Math.random() * (max - min) + min,
    y: 0
  }
}

const KEYS = {
  MOVEMENT: {
    UP: 'w',
    DOWN: 's',
    LEFT: 'a',
    RIGHT: 'd'
  },
  WEAPONS: {
    PHOTON_TORPEDOS: ' '
  }
};

const KEY_LIST = Object.values(KEYS).reduce((acc, curr) => 
  Object.values(acc).concat(Object.values(curr)), 
  []
);

const isKeyDown = {}

const reducer = (state: State, action: Action<any>): State => {
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
        shots: state.shots.concat([{x: state.pos.x, y: state.pos.y}])
      }
    case 'TICK':
      return {
        ...state,
        shots: state.shots
          .map(eachShot => ({ ...eachShot, y: eachShot.y - Constants.SHOT_DY}))
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
        invaders: state.invaders.concat([{pos: action.payload}])
      }
    default:
      return initialState;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      if (KEY_LIST.indexOf(e.key) !== -1) {
        isKeyDown[e.key] = false
      }
    }
    
    const handleKeydown = (e: KeyboardEvent) => {
      if (KEY_LIST.indexOf(e.key) !== -1) {
        isKeyDown[e.key] = true
      }
    }

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    }
  }, [])

  useEffect(() => {
    const movementId = setInterval(() => {
      if (isKeyDown[KEYS.MOVEMENT.UP]) dispatch(moveUp())
      if (isKeyDown[KEYS.MOVEMENT.DOWN]) dispatch(moveDown())
      if (isKeyDown[KEYS.MOVEMENT.LEFT]) dispatch(moveLeft())
      if (isKeyDown[KEYS.MOVEMENT.RIGHT]) dispatch(moveRight())
    }, Constants.INTERVAL_MS);

    const weaponId = setInterval(() => {
      if (isKeyDown[KEYS.WEAPONS.PHOTON_TORPEDOS]) dispatch(fire())
    }, Constants.INTERVAL_MS);

    return () => {
      clearInterval(movementId);
      clearInterval(weaponId);
    }
  }, [])

  useEffect(() => {
    const tickId = setInterval(() => {
      dispatch(tick());
      if (Math.random() < .05) {
        dispatch(createInvader(getRandomInvaderPosition(0, 1200)))
      }
    }, Constants.TICK_MS);

    return () => clearInterval(tickId);
  }, []);

  return (
    <div>
      <Graph {...state}></Graph>
    </div>
  )
}

export default App;

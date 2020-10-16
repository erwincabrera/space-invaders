import React, { useEffect, useReducer } from 'react';
import Graph from './Graph';
import { Action, MovePayload, State } from './types';

const TICK_MS = 100;
const INTERVAL_MS = 50;
const DX = 20;
const DY = 20;
const SHOT_DY = 100;

const initialState: State = {
  pos: {
    x: 100,
    y: 100
  },
  shots: []
};

const moveUp = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: 0, dy: -DY }
});

const moveDown = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: 0, dy: DY }
});

const moveLeft = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: -DX, dy: 0 }
});

const moveRight = (): Action<MovePayload> => ({
  type: 'MOVE', payload: { dx: DX, dy: 0 }
})

const fire = (): Action<any> => ({
  type: 'FIRE', payload: {}
})

const tick = (): Action<any> => ({
  type: 'TICK', payload: {}
})

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
          .map(eachShot => ({ ...eachShot, y: eachShot.y - SHOT_DY}))
          .filter(eachShot => eachShot.y > 0)
      }
    default:
      return initialState;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const tickId = setInterval(() => dispatch(tick()), TICK_MS);

    const movementId = setInterval(() => {
      if (isKeyDown[KEYS.MOVEMENT.UP]) dispatch(moveUp())
      if (isKeyDown[KEYS.MOVEMENT.DOWN]) dispatch(moveDown())
      if (isKeyDown[KEYS.MOVEMENT.LEFT]) dispatch(moveLeft())
      if (isKeyDown[KEYS.MOVEMENT.RIGHT]) dispatch(moveRight())
    }, INTERVAL_MS)

    const weaponId = setInterval(() => {
      if (isKeyDown[KEYS.WEAPONS.PHOTON_TORPEDOS]) dispatch(fire())
    }, INTERVAL_MS);

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
      clearInterval(tickId);
      clearInterval(movementId);
      clearInterval(weaponId);
    }
  }, [])

  return (
    <div>
      <Graph {...state}></Graph>
    </div>
  )
}

export default App;

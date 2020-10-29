import React, { useEffect, useReducer } from 'react';
import * as Constants from './Constants';
import * as Actions from './Actions';
import Graph from './Graph';
import { initialState, reducer } from './reducer';
import { Position } from './types';

const getRandomInvaderPosition = (min: number, max: number): Position => {
  return {
    x: Math.random() * (max - min) + min,
    y: 0
  }
}

const KEY_LIST = Object.values(Constants.KEYS).reduce((acc, curr) => 
  Object.values(acc).concat(Object.values(curr)), 
  []
);

const isKeyDown = {}

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
      if (isKeyDown[Constants.KEYS.MOVEMENT.UP]) dispatch(Actions.moveUp())
      if (isKeyDown[Constants.KEYS.MOVEMENT.DOWN]) dispatch(Actions.moveDown())
      if (isKeyDown[Constants.KEYS.MOVEMENT.LEFT]) dispatch(Actions.moveLeft())
      if (isKeyDown[Constants.KEYS.MOVEMENT.RIGHT]) dispatch(Actions.moveRight())
    }, Constants.INTERVAL_MS);

    const weaponId = setInterval(() => {
      if (isKeyDown[Constants.KEYS.WEAPONS.PHOTON_TORPEDOS]) dispatch(Actions.fire())
    }, Constants.INTERVAL_MS);

    return () => {
      clearInterval(movementId);
      clearInterval(weaponId);
    }
  }, [])

  useEffect(() => {
    const tickId = setInterval(() => {
      dispatch(Actions.tick());
      if (Math.random() < .05) {
        dispatch(Actions.createInvader(getRandomInvaderPosition(0, Constants.WIDTH), 20, 20))
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

import React, { useEffect, useReducer } from 'react';
import * as Constants from './Constants';
import * as Actions from './Actions';
import GameCanvas from './GameCanvas';
import { initialState, reducer } from './reducer';
import { Position, Sounds } from './types';
import ReactDOM from 'react-dom';
import { SoundRef, Sound } from './components/Sound';
import { StartScreen } from './components/StartScreen';

const audioMap: Record<Sounds, any> = {
  photonTorpedos: require('./audio/photon-torpedos.mp3'),
  invaderDeath: require('./audio/invader-death.mp3'),
};

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
  const audioRefs: Record<Sounds, React.MutableRefObject<SoundRef>> = {
    invaderDeath: React.useRef(),
    photonTorpedos: React.useRef()
  }

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
    const update = () => {
      dispatch(Actions.tick())
      
      if (isKeyDown[Constants.KEYS.MOVEMENT.UP]) dispatch(Actions.moveUp())
      if (isKeyDown[Constants.KEYS.MOVEMENT.DOWN]) dispatch(Actions.moveDown())
      if (isKeyDown[Constants.KEYS.MOVEMENT.LEFT]) dispatch(Actions.moveLeft())
      if (isKeyDown[Constants.KEYS.MOVEMENT.RIGHT]) dispatch(Actions.moveRight())
      if (isKeyDown[Constants.KEYS.WEAPONS.PHOTON_TORPEDOS]) dispatch(Actions.fire())

      if (Math.random() < .05) {
        dispatch(Actions.createInvader(getRandomInvaderPosition(0, Constants.WIDTH), 20, 20))
      }
    }

    const tickId = setInterval(() => ReactDOM.unstable_batchedUpdates(update) ,Constants.TICK_MS);
    return () => clearInterval(tickId)
  }, [])

  useEffect(() => {
    if (state.player.cooldown === Constants.SHOT_COOLDOWN) {
      audioRefs.photonTorpedos.current.play()
    }

    state.invaders.forEach(eachInvader => {
      if (eachInvader.hp <= 0) {
        audioRefs.invaderDeath.current.play()
      }
    })

  }, [audioRefs.invaderDeath, audioRefs.photonTorpedos, state.invaders, state.player.cooldown])

  return (
    <div>
      {Object.keys(audioMap).map(name => <Sound key={name} ref={audioRefs[name]} audio={audioMap[name]} />)}
      {state.isStarted 
        ? <GameCanvas {...state}></GameCanvas> 
        : <StartScreen handleStart={() => dispatch(Actions.start())} />}
    </div>
  )
}

export default App;

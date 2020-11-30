import React, { useEffect, useReducer, useState } from 'react';
import * as Constants from './Constants';
import * as Actions from './Actions';
import GameCanvas from './GameCanvas';
import { initialState, reducer } from './reducer';
import { Invader, Sounds } from './types';
import ReactDOM from 'react-dom';
import { SoundRef, Sound } from './components/Sound';
import { StartScreen } from './components/StartScreen';
import { getRandom, isGameOver } from './helpers';
import { EndScreen } from './components/EndScreen';
import scoresService from './services/scores';

const audioMap: Record<Sounds, any> = {
  photonTorpedos: require('./assets/audio/photon-torpedos.mp3'),
  invaderDeath: require('./assets/audio/invader-death.mp3'),
};

const getRandomInvader = (): Invader => {
  const width = 20;
  const height = 20;

  return {
    geo: {
      pos: {
        x: getRandom(0 + width / 2, Constants.WIDTH - width / 2),
        y: 0
      },
      width,
      height
    },
    hp: 1,
    score: 1
  }
}

const KEY_LIST = Object.values(Constants.KEYS).reduce((acc, curr) => 
  Object.values(acc).concat(Object.values(curr)), 
  []
);

const isKeyDown = {}

const App = () => {
  const [scores, setScores] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const audioRefs: Record<Sounds, React.MutableRefObject<SoundRef>> = {
    invaderDeath: React.useRef(),
    photonTorpedos: React.useRef()
  }

  useEffect(() => {
    scoresService.get()
      .then(score => setScores(score))
      .catch(err => console.log(err))
  }, [])

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
        dispatch(Actions.addInvader(getRandomInvader()))
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

    if (isGameOver(state)) {
      audioRefs.invaderDeath.current.play()
    }

  })

  return (
    <div>
      {Object.keys(audioMap).map(name => <Sound key={name} ref={audioRefs[name]} audio={audioMap[name]} />)}
      {state.isStarted === false
        ? <StartScreen handleStart={() => dispatch(Actions.start())} />
        : isGameOver(state)
        ? <EndScreen 
            handleNewGame={() => dispatch(Actions.newGame())} 
            handleSave={() => 0 }
            playerScore={state.score}
            scores={scores}
          />
        : <GameCanvas {...state}></GameCanvas>}
    </div>
  )
}

export default App;

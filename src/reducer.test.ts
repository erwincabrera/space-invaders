import { reducer } from './reducer'
import { State } from './types'
import * as Actions from './Actions'
import * as Constants from './Constants'

test('updates on tick', () => {
  const state: State = {
    invaders: [
      {
        height: 20,
        width: 20,
        pos: { x: 50, y: 500 - Constants.INVADER_DY}
      }
    ],
    shots: [
      { x: 50, y: 500 + Constants.SHOT_DY }
    ],
    player: {
      cooldown: 10,
      height: 50,
      width: 50,
      pos: { x: 50, y: 1000 },
    }
  };

  const expected: State = {
    ...state,
    invaders: [
      {
        height: 20,
        width: 20,
        pos: { x: 50, y: 500}
      }
    ],
    shots: [
      { x: 50, y: 500 }
    ],
    player: {
      ...state.player,
      cooldown: 9,
    }
  }

  expect(reducer(state, Actions.tick())).toEqual(expected)
})

test('destroys both shot and invader upon impact', () => {
  const state: State = {
    invaders: [
      {
        height: 20,
        width: 20,
        pos: { x: 50, y: 500 }
      }
    ],
    shots: [
      { x: 50, y: 500 }
    ],
    player: {
      height: 50,
      width: 50,
      pos: { x: 50, y: 1000 },
      cooldown: 10,
    }
  };

  const expected: State = {
    ...state,
    invaders: [],
    shots: [],
    player: {
      ...state.player,
      cooldown: 9
    }
  }

  expect(reducer(state, Actions.tick())).toEqual(expected)
})

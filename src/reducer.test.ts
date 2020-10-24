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
        pos: { x: 50, y: 50 }
      }
    ],
    shots: [
      { x: 80, y: 400 + Constants.SHOT_DY }
    ],
    player: {
      cooldown: 10,
      height: 50,
      width: 50,
      pos: { x: 50, y: 500 },
    }
  }
  const expected: State = {
    invaders: [
      {
        height: 20,
        width: 20,
        pos: { x: 50, y: 50 + Constants.INVADER_DY}
      }
    ],
    shots: [
      { x: 80, y: 400 }
    ],
    player: {
      cooldown: 9,
      height: 50,
      width: 50,
      pos: { x: 50, y: 500 },
    }
  }

  expect(reducer(state, Actions.tick())).toEqual(expected)
})


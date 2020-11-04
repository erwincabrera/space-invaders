import { reducer } from './reducer'
import { State } from './types'
import * as Actions from './Actions'
import * as Constants from './Constants'

test('updates on tick', () => {
  const state: State = {
    isStarted: true,
    invaders: [
      {
        height: 20,
        width: 20,
        pos: { x: 50, y: 500 - Constants.INVADER_DY},
        hp: 1
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
        pos: { x: 50, y: 500},
        hp: 1
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

test('hit logic', () => {
  const state: State = {
    isStarted: true,
    invaders: [
      {
        height: 20,
        width: 20,
        pos: { x: 50, y: 500 },
        hp: 1
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
    invaders: [
      {
        height: 20,
        width: 20,
        pos: { x: 50, y: 500 },
        hp: 0
      }
    ],
    shots: [],
    player: {
      ...state.player,
      cooldown: 9
    }
  }

  expect(reducer(state, Actions.tick())).toEqual(expected)
})

test('hit logic - just toucing invader lower left', () => {
  const invaderHeight = 20;
  const invaderWidth = Constants.SHOT_WIDTH - 1;
  const state: State = {
    isStarted: true,
    invaders: [
      {
        height: invaderHeight,
        width: invaderWidth,
        pos: { x: 50, y: 500 },
        hp: 1
      }
    ],
    shots: [
      { x: 50 - Constants.SHOT_WIDTH, y: 500 + invaderHeight }
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
    invaders: [
      {
        height: invaderHeight,
        width: invaderWidth,
        pos: { x: 50, y: 500 },
        hp: 0
      }
    ],
    shots: [],
    player: {
      ...state.player,
      cooldown: 9
    }
  }

  expect(reducer(state, Actions.tick())).toEqual(expected)
})

test('hit logic - just toucing invader lower right', () => {
  const invaderHeight = 20;
  const invaderWidth = Constants.SHOT_WIDTH - 1;
  const state: State = {
    isStarted: true,
    invaders: [
      {
        height: invaderHeight,
        width: invaderWidth,
        pos: { x: 50, y: 500 },
        hp: 1
      }
    ],
    shots: [
      { x: 50 + invaderWidth, y: 500 + invaderHeight }
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
    invaders: [
      {
        height: invaderHeight,
        width: invaderWidth,
        pos: { x: 50, y: 500 },
        hp: 0
      }
    ],
    shots: [],
    player: {
      ...state.player,
      cooldown: 9
    }
  }

  expect(reducer(state, Actions.tick())).toEqual(expected)
})

test('hit logic - just toucing invader upper left edge case', () => {
  const invaderHeight = 20;
  const invaderWidth = Constants.SHOT_WIDTH - 1;
  const state: State = {
    isStarted: true,
    invaders: [
      {
        height: invaderHeight,
        width: invaderWidth,
        pos: { x: 50, y: 500 + Constants.INVADER_DY},
        hp: 1
      }
    ],
    shots: [
      { x: 50 - Constants.SHOT_WIDTH, y: 500 + invaderHeight - Constants.SHOT_DY}
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
    invaders: [
      {
        height: invaderHeight,
        width: invaderWidth,
        pos: { x: 50, y: 500 + Constants.INVADER_DY},
        hp: 0
      }
    ],
    shots: [],
    player: {
      ...state.player,
      cooldown: 9
    }
  }

  expect(reducer(state, Actions.tick())).toEqual(expected)
})

test('hit logic - just toucing invader upper right edge case', () => {
  const invaderHeight = 20;
  const invaderWidth = Constants.SHOT_WIDTH - 1;
  const state: State = {
    isStarted: true,
    invaders: [
      {
        height: invaderHeight,
        width: invaderWidth,
        pos: { x: 50, y: 500 + Constants.INVADER_DY},
        hp: 1
      }
    ],
    shots: [
      { x: 50 + invaderWidth, y: 500 + invaderHeight - Constants.SHOT_DY}
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
    invaders: [
      {
        height: invaderHeight,
        width: invaderWidth,
        pos: { x: 50, y: 500 + Constants.INVADER_DY},
        hp: 0
      }
    ],
    shots: [],
    player: {
      ...state.player,
      cooldown: 9
    }
  }

  expect(reducer(state, Actions.tick())).toEqual(expected)
})

test('hit logic - distance too large', () => {
  const invaderHeight = 20;
  const state: State = {
    isStarted: true,
    invaders: [
      {
        height: invaderHeight,
        width: 20,
        pos: { x: 50, y: 500 + Constants.INVADER_DY + 0.5},
        hp: 1
      }
    ],
    shots: [
      { x: 50, y: 500 + invaderHeight - Constants.SHOT_DY}
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
    invaders: [
      {
        height: invaderHeight,
        width: 20,
        pos: { x: 50, y: 500 + 2*Constants.INVADER_DY + 0.5},
        hp: 1
      }
    ],
    shots: [
      { x: 50, y: 500 + invaderHeight - 2*Constants.SHOT_DY}
    ],
    player: {
      ...state.player,
      cooldown: 9
    }
  }

  expect(reducer(state, Actions.tick())).toEqual(expected)
})

test('hit logic - when HP is 0, destroy on next tick', () => {
  const state: State = {
    isStarted: true,
    invaders: [
      {
        height: 20,
        width: 20,
        pos: { x: 50, y: 500 },
        hp: 0
      }
    ],
    shots: [],
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

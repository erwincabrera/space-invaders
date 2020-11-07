import React from 'react'

export const EndScreen = ({ handleNewGame }) => {
  return (
    <div className='end-screen-container'>
      <div className='end-screen'>
        <h1>Game Over</h1>
        <button onClick={handleNewGame}>New Game</button>
      </div>
    </div>
  )
}

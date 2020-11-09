import React from 'react'

export const EndScreen = ({ handleNewGame, score }) => {
  return (
    <div className='end-screen-container'>
      <div className='end-screen'>
        <h1>Game Over</h1>
        <h2>Your score: {score}</h2>
        <button onClick={handleNewGame}>New Game</button>
      </div>
    </div>
  )
}

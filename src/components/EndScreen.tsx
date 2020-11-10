import React from 'react'

export const EndScreen = ({ handleNewGame, score, scores }) => {
  return (
      <div className='end-screen'>
        <section>
          <h1>Game Over</h1>
          <h2>Your score: {score}</h2>
          <button onClick={handleNewGame}>New Game</button>
        </section>
        <section>
          <h2>High Scores</h2>
          <ol>
            {scores.map((eachScore, i) => (
            <li>
              {/* TODO: truncate when username gets too long */}
              {i + 1}. {eachScore.username} <span className="score">{eachScore.score}</span>
            </li>))}
          </ol>
        </section>
      </div>
  )
}

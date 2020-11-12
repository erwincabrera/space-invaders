import React from 'react'

interface Score {
  username: string;
  score: number;
}

interface Props {
  handleNewGame: () => void;
  handleSave: () => void;
  playerScore: number;
  scores: Score[];
}

export const EndScreen: React.FC<Props> = (props) => {
  return (
      <div className='screen end-screen'>
        <section className="panel panel-end">
          <h1>Game Over</h1>
          <h2>Your score: {props.playerScore}</h2>
          <section className="buttons">
            <button onClick={props.handleNewGame}>New Game</button>
            <button>Save</button>
          </section>
          <h2>High Scores</h2>
          <ul>
            {props.scores.map((eachScore, i) => (
            <li>
              {/* TODO: truncate when username gets too long */}
              {i + 1}. {eachScore.username} <span className="score">{eachScore.score}</span>
            </li>))}
          </ul>
        </section>
      </div>
  )
}

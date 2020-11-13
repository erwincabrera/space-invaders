import React from 'react'
import { HighScores, Props as HighScoreProps } from './HighScores'

interface Props extends HighScoreProps {
  handleNewGame: () => void;
  handleSave: () => void;
  playerScore: number;
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
        <HighScores scores={props.scores} />
      </section>
    </div>
  )
}

import React from 'react'
import { HighScores, Props as HighScoreProps } from './HighScores'

interface Props extends HighScoreProps {
  handleNewGame: () => void;
  handleSave: () => void;
  playerScore: number;
}

export const EndView: React.FC<Props> = (props) => {
  return (
    <div className='screen end-screen'>
      <section className="panel panel-end">
        <h1 style={{'marginTop': 0}}>Game Over</h1>
        <h2>Your score: {props.playerScore}</h2>
        <section className="buttons">
          <button onClick={props.handleNewGame}>New Game</button>
          <button onClick={props.handleSave}>Save</button>
        </section>
        <HighScores scores={props.scores} />
      </section>
    </div>
  )
}

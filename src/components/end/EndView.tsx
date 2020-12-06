import React from 'react'
import { HighScores, Props as HighScoreProps } from './HighScores'

interface Props extends HighScoreProps {
  handleNewGame: () => void;
  handleLogin: () => void;
  playerScore: number;
  username: string;
}

export const EndView: React.FC<Props> = (props) => {
  return (
    <div className='screen end-screen'>
      <section className="panel panel-end">
        <h1 style={{'marginTop': 0}}>Game Over</h1>
        <h2>Your score: {props.playerScore}</h2>
        {!props.username && <p>Login to save your score.</p>}
        <section className="buttons">
          <button onClick={props.handleNewGame}>New Game</button>
          {!props.username && <button onClick={props.handleLogin}>Login</button>}
        </section>
        <HighScores scores={props.scores} />
      </section>
    </div>
  )
}

import React from 'react'
import { Panel } from '../Panel'
import { HighScores, Props as HighScoreProps } from './HighScores'

interface Props extends HighScoreProps {
  handleNewGame: () => void;
  handleLogin: () => void;
  handleLogout: () =>  void;
  playerScore: number;
  username: string;
}

export const EndView: React.FC<Props> = (props) => {
  return (
    <div className='screen'>
      <Panel width='40em'>
        <h1 style={{'marginTop': 0}}>Game Over</h1>
        <h2>Your score: {props.playerScore}</h2>
        {!props.username && <p>Login to save your score.</p>}
        <section className="buttons">
          <button onClick={props.handleNewGame}>New Game</button>
          {!props.username && <button onClick={props.handleLogin}>Login</button>}
          {props.username && <button onClick={props.handleLogout}>Logout</button>}
        </section>
        <HighScores scores={props.scores} />
      </Panel>
    </div>
  )
}

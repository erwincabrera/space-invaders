import React from 'react'
import { Table } from './Table'

interface Score {
  username: string;
  score: number;
}

export interface Props {
  scores: Score[];
}

export const HighScores: React.FC<Props> = (props) => {
  return (
    <>
      <h1>High Scores</h1>
      <div className='high-scores-container'>
        <Table 
          rows={props.scores.map((eachScore, i) => ({
              left: `${i + 1}. ${eachScore.username}`,
              right: <span className="score">{eachScore.score}</span>
          }))}
        />
      </div>
    </>
  )
}


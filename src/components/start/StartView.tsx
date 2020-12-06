import React from 'react'
import { Panel } from '../Panel'
import { ControlsTable } from './ControlsTable'

export const StartView = ({ handleStart }) => {
  return (
    <div className='screen'>
      <Panel width='22em'>
        <ControlsTable keys={[
            {
              key: "W",
              description: "Move up"
            },
            {
              key: "S",
              description: "Move down"
            },
            {
              key: "A",
              description: "Move left"
            },
            {
              key: "D",
              description: "Move right"
            },
            {
              key: "Spacebar",
              description: "Fire photon torpedos"
            }
          ]}
        />
        <button style={{marginTop: '3em'}} onClick={handleStart}>Start</button>
      </Panel>
    </div>
  )
}

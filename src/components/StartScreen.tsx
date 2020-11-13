import React from 'react'
import { ControlsTable } from './ControlsTable'

export const StartScreen = ({ handleStart }) => {
  return (
    <div className='screen start-screen'>
      <section className='panel panel-start'>
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
        ]}/>
        <button style={{marginTop: '3em'}} onClick={handleStart}>Start</button>
      </section>
    </div>
  )
}

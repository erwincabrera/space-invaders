import React from 'react'

export const StartScreen = ({ handleStart }) => {
  return (
    <div className='start-screen-container'>
      <div className='start-screen'>
        <section className='controls'>
          <h1>Controls</h1>
          <ul>
            <li>
              <p className='movement-key'>W</p>
              <p>Move up</p>
            </li>
            <li>
              <p className='movement-key'>S</p>
              <p>Move down</p>
            </li>
            <li>
              <p className='movement-key'>A</p>
              <p>Move left</p>
            </li>
            <li>
              <p className='movement-key'>D</p>
              <p>Move right</p>
            </li>
            <li>
              <p className='movement-key'>Spacebar</p>
              <p>Fire photon torpedos</p>
            </li>
          </ul>
        </section>
        <button onClick={handleStart}>Start</button>
      </div>
    </div>
  )
}

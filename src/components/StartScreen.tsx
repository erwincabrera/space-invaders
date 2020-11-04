import React from 'react'

export const StartScreen = ({handleStart}) => {
  return (
    <div className='start-screen'>
      <button onClick={handleStart}>Start</button>
    </div>
  )
}

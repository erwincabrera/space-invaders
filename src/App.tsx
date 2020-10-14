import React, { useEffect, useState } from 'react';
import Graph from './Graph';

const INTERVAL_MS = 50;
const X0 = 100;
const Y0 = 100;
const DX = 20;
const DY = 20;
const MOVEMENT = {
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd'
}
const isKeyDown = {}

const App = () => {
  
  const [x, setX] = useState(X0);
  const [y, setY] = useState(Y0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isKeyDown[MOVEMENT.UP]) setY(y => y - DY)
      if (isKeyDown[MOVEMENT.DOWN]) setY(y => y + DY)
      if (isKeyDown[MOVEMENT.LEFT]) setX(x => x - DX)
      if (isKeyDown[MOVEMENT.RIGHT]) setX(x => x + DX)
    }, INTERVAL_MS)
    
    const handleKeyup = (e: KeyboardEvent) => {
      if (Object.values(MOVEMENT).indexOf(e.key) !== -1) {
        isKeyDown[e.key] = false
      }
    }
    
    const handleKeydown = (e: KeyboardEvent) => {
      if (Object.values(MOVEMENT).indexOf(e.key) !== -1) {
        isKeyDown[e.key] = true
      }
    }

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
      clearInterval(intervalId);
    }
  }, [])


  return (
    <div>
      <Graph x={x} y={y}></Graph>
    </div>
  )
}

export default App;

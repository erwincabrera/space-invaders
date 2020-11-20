import React, { useEffect } from 'react'
import { State } from "./types";
import * as Constants from "./Constants";

type Props = State

const GameCanvas: React.FC<Props> = (props) => {
    const canvas = React.useRef<HTMLCanvasElement>()

    useEffect(() => {
        const current = canvas.current;
        
        if (current.getContext) {
            let ctx: CanvasRenderingContext2D = current.getContext('2d')

            ctx.clearRect(0, 0, current.width, current.height)
            
            // Draw player
            const { pos, width, height } = props.player.geo;
            ctx.save();
            ctx.translate(pos.x, pos.y)
            ctx.lineWidth = 6
            ctx.strokeStyle = 'gray'
            ctx.lineCap = 'round'
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, height);
            ctx.moveTo(width, 0);
            ctx.lineTo(width, height);
            ctx.stroke();

            let centerX = width / 2;
            let centerY = height / 2;

            ctx.fillStyle = 'gray'
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2*Math.PI)
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.fill();
            ctx.stroke();
            

            const gradient = ctx.createLinearGradient(centerX, centerY - height / 2, centerX, centerY + height / 2)
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, 'gray');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, width / 4.8, height / 4, 0, 0, 2*Math.PI)
            ctx.fill();
            ctx.restore();

            // Draw shots
            props.shots.forEach(eachShot => {
                const { x, y } = eachShot.geo.pos;
                const { width, height } = eachShot.geo;
                ctx.save();
                ctx.translate(x, y);
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'purple';
                ctx.fillStyle = 'violet';
                ctx.beginPath();
                ctx.ellipse(width/2, height/2, width/2, height/2, 0, 0, 2*Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            })

            // Draw invaders
            props.invaders.forEach(eachInvader => {
                const { x, y } = eachInvader.geo.pos;
                const { width, height } = eachInvader.geo;
                ctx.save();
                ctx.translate(x, y);
                ctx.fillStyle = 'gray';
                ctx.beginPath();
                ctx.ellipse(width/2, height/2, width/2, height/2, 0, 0, 2*Math.PI);
                ctx.fill();
                ctx.restore();
            })
        }
    }, [props.invaders, props.player.geo, props.shots])

    return (
        <div className="graph-container">
            <canvas 
                ref={canvas}  
                style={{margin: '0 auto', display: 'block'}} 
                width={Constants.WIDTH} 
                height={Constants.HEIGHT}
            >
                This browser is not supported.
            </canvas>
        </div>
    )
}

export default GameCanvas
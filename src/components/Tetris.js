import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

// styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';


const Tetris = () => {
    const [dropTime, setDroptTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log('re-render');

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
        updatePlayerPos({ x: dir, y: 0 });
        }
    }

    const startGame = () => {
        // reset everything
        setStage(createStage());
        setDroptTime(1000);
        resetPlayer();
        setGameOver(false);
    }

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
        updatePlayerPos({ x: 0, y: 1, collided: false })
        } else {
            // game over
            if (player.pos.y < 1) {
                console.log("GAME OVER")
                setGameOver(true);
                setDroptTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode}) => {
        if (!gameOver) {
            if (keyCode === 40) {
                console.log("interval on")
                setDroptTime(1000);
            }
        }
    }

    const dropPlayer = () => {
        // stop droptime when you press down
        console.log("interval off")
        setDroptTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
        } else if (keyCode === 39) {
            movePlayer(1);
        } else if (keyCode === 40) {
            dropPlayer();
        } else if (keyCode === 38) {
            playerRotate(stage, 1);
        }
        
    }
}

useInterval(() => {
    drop();
}, dropTime)

    return (
        // has key controls
        <StyledTetrisWrapper role="button"
         tabIndex="0"
          onKeyDown={e => move(e)}
           onKeyUp={keyUp}>
            <StyledTetris>
                
                    <Stage stage={stage} />
                    <aside>
                        {gameOver ? (
                            <Display gameOver={gameOver} text="Game Over" />
                        ) : (
                        <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text="Level" />
                        </div>
                        )}
                        <StartButton callback={startGame}/>
                    </aside>
                
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
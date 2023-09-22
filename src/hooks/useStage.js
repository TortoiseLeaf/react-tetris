import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';
import { usePlayer } from './usePlayer';



export const useStage = (player, resetPlayer) => {
    console.log("new log: ", resetPlayer)
    const [stage, setStage] = useState(createStage())


    useEffect(() => {
        const updateStage = prevStage => {
            // first flush the stage
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
                );

                console.log("newStage before collided", newStage)
            // draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            })
            console.log("newstage after collided", newStage)

            // check if collided
            console.log("resetPlayer is", resetPlayer)
            if (player.collided) {
                resetPlayer();
            }

            return newStage;
        };

        setStage(prev => updateStage(prev))

    }, [player, resetPlayer]);

    return [stage, setStage];
};
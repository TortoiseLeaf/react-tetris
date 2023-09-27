import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';


export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);


    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage =>
        // ack is new array built up inside reduce function
            newStage.reduce((ack, row) => {
                // if no 0 cell is found in row don't clear it
                // if it doesn't find 0 it will return -1 and we know to clear the row
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    ack.unshift(new Array(newStage[0].length).fill([0,'clear']));
                    return ack;
                }
                ack.push(row);
                    return ack;
            }, [])

        const updateStage = prevStage => {
            // first flush the stage
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
                );

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

            // check if collided
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }

            return newStage;
        };

        setStage(prev => updateStage(prev))
    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared];
};
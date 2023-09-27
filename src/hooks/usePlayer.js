import { useCallback, useState } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from '../gameHelpers';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const rotate = (tetromino, dir) => {
        // make rows become cols
        const rotatedTetro = tetromino.map((_, index) =>
         tetromino.map(col => col[index]),
         );
        // reverse each row to rotate
        if ( dir > 0 ) return rotatedTetro.map(row => row.reverse())
        return rotatedTetro.reverse()
    };

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir)

        setPlayer(clonedPlayer);
    }

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}
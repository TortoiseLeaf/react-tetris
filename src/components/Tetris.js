import React from 'react';

import { createStage } from '../gameHelpers';

// components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {


    return (
        <div>
            {/* will take in props eventually */}
            <Stage stage={createStage()} />

            {/* this is the side display stack */}
            <aside>
                <div>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                </div>
                <StartButton />
            </aside>
        </div>
    );
};

export default Tetris;
// src/main.jsx
import React from 'react';
import { render } from 'react-dom';

import Hello from './components/hello.jsx';
import World from './components/world.jsx';
import CharaMaker from './components/CharaMaker.jsx';

render(
    <div>
        <CharaMaker/>
    </div>,
    document.getElementById('app')
);
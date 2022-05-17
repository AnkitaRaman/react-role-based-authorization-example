import React from 'react';
import { render } from 'react-dom';

import { App } from './App';

// setup controller backend
//import { configureControllerBackend } from './_helpers';
//configureControllerBackend();

render(
    <App />,
    document.getElementById('app')
);
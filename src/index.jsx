import React from 'react';
import { render } from 'react-dom';
require('./style.css');
import { App } from './App';

// setup controller backend
//import { configureControllerBackend } from './_helpers';
//configureControllerBackend();

render(
    <App />,
    document.getElementById('app')
);
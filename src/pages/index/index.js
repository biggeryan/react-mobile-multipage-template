// If you use any other ES6+ features that need runtime support (such as Array.from() or Symbol)
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './style.scss';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

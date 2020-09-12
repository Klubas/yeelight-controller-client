import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import {api} from './services/Api';
import Card from './components/Card';
import Login from './components/Login';

import './index.css';

//const currentLocation = window.location.href

var needAuth = true
if (needAuth)
  ReactDOM.render(
    <React.StrictMode>
      <Login />
    </React.StrictMode>,
    document.getElementById('root'))
else
  ReactDOM.render(
    <React.StrictMode>
      <Card ip="192.168.1.19" name="Quarto"/>
    </React.StrictMode>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

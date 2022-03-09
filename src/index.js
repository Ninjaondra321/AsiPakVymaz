import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import './layout.css';
import './icons.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 


/*
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './Home'


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={Home}/>
      <Route path="xd" element={<h1>Fuuuck</h1>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
//serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

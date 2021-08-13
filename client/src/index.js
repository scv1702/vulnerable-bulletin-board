/************************************************************************
> File name: index.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: index.js of React.js 
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Component
import Header from './Header';
import Body from './Body';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Body />
  </BrowserRouter>,
  document.getElementById('root')
);
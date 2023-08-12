import React from 'react';
import ApplicationRouter from './router';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <ApplicationRouter />
  </BrowserRouter>,
  document.getElementById("root")
)
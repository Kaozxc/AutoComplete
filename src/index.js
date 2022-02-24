import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import usersData from './users.json';

ReactDOM.render(
  <React.StrictMode>
    <App usersData={usersData} />
  </React.StrictMode>,
  document.getElementById('root')
);


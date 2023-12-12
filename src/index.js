import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Spreadsheet from "./Table.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Spreadsheet />
  </React.StrictMode>
);



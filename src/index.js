import React from 'react';
import ReactDOM from 'react-dom/client';
import SpreadsheetTEST from './componentreact.js';
import InsertButton from './buttonTest.js';
import Spreadsheet from './Table.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render both the SpreadsheetTEST and InsertButton components in the same root
root.render(
  <>
    <Spreadsheet />
    <InsertButton />
  </>
);
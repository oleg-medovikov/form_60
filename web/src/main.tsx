import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AppErrorProvider } from '@providers/AppErrorProvider';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppErrorProvider>
        <App />
      </AppErrorProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

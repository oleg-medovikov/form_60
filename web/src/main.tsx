import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AppConfigProvider } from '@providers/AppConfigProvider';
import { AppErrorProvider } from '@providers/AppErrorProvider';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppConfigProvider>
        <AppErrorProvider>
          <App />
        </AppErrorProvider>
      </AppConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

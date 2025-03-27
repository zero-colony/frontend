import { Web3Provider } from '@features/global/providers/web3-provider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </React.StrictMode>
);

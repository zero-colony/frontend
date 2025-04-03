import { Web3Provider } from '@features/global/providers/web3-provider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './index.css';
import { CorrectNetworkProvider } from '@features/global/providers/CorrectNetworkProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3Provider>
      <CorrectNetworkProvider>
        <App />
      </CorrectNetworkProvider>
    </Web3Provider>
  </React.StrictMode>
);

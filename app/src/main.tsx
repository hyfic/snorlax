import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraWrap } from './components/chakraWrap';
import './style.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraWrap>
      <App />
    </ChakraWrap>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AccountProvider from './context/AccountProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AccountProvider>
    <React.StrictMode>
      <App />
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        theme="dark"
      />
    </React.StrictMode>
  </AccountProvider>
);
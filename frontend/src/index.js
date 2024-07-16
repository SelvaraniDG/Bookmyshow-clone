import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { authActions } from './redux/authSlice';

const initializeAuth = () => {
  const user = localStorage.getItem('user');
  if (user) {
    store.dispatch(authActions.login());
  }
};

initializeAuth();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
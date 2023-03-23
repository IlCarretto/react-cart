import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, useAppSelector } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCartProducts } from './redux/Cart/cartSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.body.style.background = '#f1f1f1';
// /Style

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

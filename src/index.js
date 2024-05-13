import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Configura la primera URL base
export const axiosInstanceCliente = axios.create({
  baseURL: process.env.REACT_APP_API_URL_CLIENTE
});

// Configura la segunda URL base
export const axiosInstanceUsuario = axios.create({
  baseURL: process.env.REACT_APP_API_URL_USUARIO
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
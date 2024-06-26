import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Context/AuthContext'
import { ProductProvider } from './Context/ProductContext'
import { CartProvider } from './Context/CartContext'
import { FavoriteProvider } from './Context/FavoriteContext'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <FavoriteProvider>
            <BrowserRouter>
    <App />
    </BrowserRouter>
          </FavoriteProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

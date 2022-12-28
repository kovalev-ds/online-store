import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import CartProvider from './context/CartContext';
import { router } from './router';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);

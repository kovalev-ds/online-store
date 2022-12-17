import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import CartPage from './pages/CartPage'
import ProductPage, { loader as productLoader } from './pages/ProductPage';

import StorePage, { action as storeAction, loader as storeLoader } from './pages/StorePage'

export const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      index: true,
      element: <StorePage />,
      loader: storeLoader,
      action: storeAction
    },
    {
      path: '/cart',
      element: <CartPage />
    },
    {
      path: '/products/:id',
      element: <ProductPage />,
      loader: productLoader
    }
  ]
}])
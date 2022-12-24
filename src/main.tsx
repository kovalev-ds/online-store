import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'

import './index.scss'
import StoreProvider from './context/CartContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreProvider>
    <RouterProvider router={router} />
  </StoreProvider>
)

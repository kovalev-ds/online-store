import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";
import ProductPage, { loader as productLoader } from "./pages/ProductPage";
import StorePage, { loader as storeLoader } from "./pages/StorePage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { path: '/', element: <StorePage />, loader: storeLoader },
          { path: 'cart', element: <CartPage /> },
          { path: 'products/:id', element: <ProductPage />, loader: productLoader }
        ]
      }
    ]
  }
])
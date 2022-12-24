import { Link, Outlet } from "react-router-dom"
import { useCartContext } from "./context/CartContext"

const App = () => {
  const { totalPrice, totalCount } = useCartContext();

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="py-4">
        <div className="container flex justify-between items-center">
          <h1>
            <Link to='/'>Online Store</Link>
          </h1>
          <div>
            {totalPrice}$
          </div>
          <div>
            <Link to='/cart'>Cart <span>{totalCount}</span></Link>
          </div>
        </div>
      </nav>
      <main className="flex-1 py-4">
        <Outlet />
      </main>
      <footer className="bg-neutral-900 py-4">
        <div className="container text-white">
          footer
        </div>
      </footer>
    </div>
  )
}

export default App

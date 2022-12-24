import { Link, Outlet } from "react-router-dom"
import { useCartContext } from "./context/CartContext"

const App = () => {
  const { totalPrice, totalCount } = useCartContext();

  return (
    <>
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
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App

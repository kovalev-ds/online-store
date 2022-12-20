import { Link, Outlet } from "react-router-dom"
import { useStoreContext } from "./store"

const App = () => {
  const { cart, total } = useStoreContext();

  return (
    <>
      <nav className="py-4">
        <div className="container flex justify-between items-center">
          <h1>
            <Link to='/'>Online Store</Link>
          </h1>
          <div>
            {total}$
          </div>
          <div>
            <Link to='/cart'>Cart <span>{cart.length}</span></Link>
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

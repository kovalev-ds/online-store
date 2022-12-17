import { Outlet, Link } from "react-router-dom"



const App = () => {


  return (
    <>
      <nav>
        <div className="container flex justify-between items-center py-4">
          <Link to='/'>Online Store</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App

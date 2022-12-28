import { Link, Outlet } from "react-router-dom";
import { useCartContext } from "./context/CartContext";
import { IoCart } from "react-icons/io5";

const App = () => {
  const { totalPrice, totalCount } = useCartContext();

  return (
    <div className="flex flex-col min-h-screen bg-pink-100">
      <nav className="py-4">
        <div className="container flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">
            <Link to="/">Online Store</Link>
          </h1>
          <div>{totalPrice}$</div>
          <div>
            <Link to="/cart" className="flex items-center gap-x-2">
              <IoCart />
              <span className="h-8 w-8 bg-orange-500 flex items-center justify-center rounded-full text-white font-bold">
                {totalCount}
              </span>
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-1 py-4">
        <Outlet />
      </main>
      <footer className="bg-neutral-900 py-4">
        <div className="container text-white">footer</div>
      </footer>
    </div>
  );
};

export default App;

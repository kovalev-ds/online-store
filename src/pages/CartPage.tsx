import { useState } from "react";
import { Link } from "react-router-dom";
import List from "../components/List";
import Popup from "../components/Popup";
import { useCartContext } from "../context/CartContext";

const CartPage = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { totalCount, totalPrice, cart, addToCart, removeFromCart } = useCartContext()

  return (
    <div className="container grid grid--cart">
      <div className="border space-y-4">
        <List items={cart} fn={({ product, count }) => (
          <div key={product.id} className="flex">
            <Link to={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.thumbnail} className="h-20" />
              <div>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <button onClick={() => addToCart(product)}>add</button>
              <div>{count}</div>
              <button onClick={() => removeFromCart(product)}>remove</button>
            </div>
          </div>)} />
      </div>

      <div className="border">
        <div>Total {totalPrice} $</div>
        <div>Products: {totalCount}</div>
        <button onClick={() => setIsOpen(() => true)}>Buy Now</button>
        <Popup isOpen={isOpen} onClose={() => setIsOpen(() => false)}>
          <div className="min-w-[440px] min-h-[700px] bg-slate-50 rounded-2xl border border-black border-opacity-10 shadow">
            Personal details Form
          </div>
        </Popup>
      </div>
    </div>
  )
}

export default CartPage;
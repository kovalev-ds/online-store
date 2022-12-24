import List from "../components/List";
import { useCartContext } from "../context/CartContext";

const CartPage = () => {

  const { totalCount, totalPrice, cart, addToCart, removeFromCart } = useCartContext()

  return (
    <div className="container grid grid--cart">
      <div className="border space-y-4">
        <List items={cart} fn={({ product, count }) => (
          <div key={product.id} className="flex">
            <img src={product.thumbnail} alt={product.thumbnail} className="h-20" />
            <div>
              <h1>{product.title}</h1>
              <p>{product.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => addToCart(product)}>add</button>
              <div>{count}</div>
              <button onClick={() => removeFromCart(product)}>remove</button>
            </div>
          </div>)} />
      </div>

      <div className="border">Total Price {totalPrice} $</div>
    </div>
  )
}

export default CartPage;
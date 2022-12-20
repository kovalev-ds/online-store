import List from "../components/List";
import { useStoreContext } from "../store";

const CartPage = () => {

  const { total, cart } = useStoreContext()

  return (
    <div className="container grid grid--cart">
      <div className="border">
        {cart.length
          ? <List items={cart} fn={(item) => (
            <div>
              <h1>{item.title}</h1>
            </div>)} />
          : <div>Cart is Empty</div>
        }
      </div>

      <div className="border">Total Price {total} $</div>
    </div>
  )
}

export default CartPage;
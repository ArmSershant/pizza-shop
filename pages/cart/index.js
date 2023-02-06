/* eslint-disable @next/next/no-img-element */
import axios from "axios"
import { useRouter } from "next/router"
export const getServerSideProps = async () => {
  let data = await fetch("http://localhost:5000/cart")
  data = await data.json()
  return {
    props: {
      items: data.cart,
    },
  }
}
const Cart = ({ items }) => {
  const router = useRouter()
  const quantityUp = (id) => {
    axios.put("http://localhost:5000/quantityUp", { id }).then((r) => {
      router.replace(router.asPath)
    })
  }
  const quantityDown = (id) => {
    axios.put("http://localhost:5000/quantityDown", { id }).then((r) => {
      router.replace(router.asPath)
    })
  }
  return (
    <div>
      <h1>Cart</h1>
      <div className="cart">
        {items.map((item) => {
          return (
            <div key={item.id}>
              <img src={"http://localhost:5000/" + item.photo} alt="" />
              <h3>{item.name}</h3>
              <p>
                <small>Sybtotal: </small>
                {item.price * item.quantity} AMD
              </p>
              <p>
                <small>Quantity: </small>
                {item.quantity}
              </p>
              <button onClick={() => quantityUp(item.id)}>+</button>
              <button onClick={() => quantityDown(item.id)}>-</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Cart

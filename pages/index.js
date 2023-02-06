/* eslint-disable @next/next/no-img-element */
import axios from "axios"
import { useRouter } from "next/router"
export const getServerSideProps = async () => {
  let data = await fetch("http://localhost:5000/products")
  data = await data.json()
  return {
    props: {
      products: data.products,
    },
  }
}
const Home = ({ products }) => {
  const router = useRouter()
  const move = (id) => {
    axios.post("http://localhost:5000/moveToCart", { id }).then((r) => {
      router.push("/cart")
    })
  }
  return (
    <div>
      <h1>Pizza Shop</h1>
      <div className="grid">
        {products.map((elm,i) => {
          return (
            <div key={i}>
              <img src={"http://localhost:5000/" + elm.photo} alt="" />
              <h4>{elm.name}</h4>
              <p>{elm.price} AMD</p>
              <button onClick={() => move(elm.id)}>To cart</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Home


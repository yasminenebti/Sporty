
import Footer from "./components/Footer"
import Navigation from "./components/Navigation"
import Home from "./pages/Home"
import ProductList from './components/products-section/ProductList'
import { Route, Routes } from "react-router"
import ProductOverview from "./components/products-section/ProductOverview"
import Cart from "./components/cart/Cart"
import Checkout from "./components/checkout/Checkout"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Order from "./components/Order/Order"
import OrderDetails from "./components/Order/OrderDetails"


function App() {
  

  return (
    <>
      <div className="navigation">
        <Navigation/></div>
      <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/:levelOne/:levelTwo/:levelThree" element={<ProductList/>}></Route>
      <Route path="/product/:productId" element={<ProductOverview/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/checkout" element={<Checkout/>}></Route>
      <Route path="/account/order" element={<Order/>}></Route>
      <Route path="/account/order/:orderId" element={<OrderDetails/>}></Route>

      
      </Routes>
      
      <Footer/>
    </>
  )
}

export default App

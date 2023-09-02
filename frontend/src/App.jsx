
import Footer from "./components/Footer"
import Navigation from "./components/Navigation"
import Home from "./pages/Home"
import Product from './components/products-section/Product'
import { Route, Routes } from "react-router"
import ProductOverview from "./components/products-section/ProductOverview"
import Cart from "./components/cart/Cart"
import Checkout from "./components/cart/Checkout"


function App() {
  

  return (
    <div>
      <div className="navigation">
        <Navigation/></div>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/checkout" element={<Checkout/>}></Route>
      <Route path="/product" element={<Product/>}></Route>
      <Route path="/overview" element={<ProductOverview/>}></Route>
      </Routes>
      
      <Footer/>
    </div>
  )
}

export default App

import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import ProductList from "./pages/products-section/ProductList";
import { Route, Routes } from "react-router";
import ProductOverview from "./pages/products-section/ProductOverview";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Order from "./pages/Order/Order";
import OrderDetails from "./pages/Order/OrderDetails";
import Account from "./pages/profile/Account";
import HistoryOrder from "./pages/profile/HistoryOrder";
import WishList from "./pages/profile/WishList";
import Password from "./pages/profile/Password";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <>
      <div className="navigation">
        <Navigation />
      </div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/account/settings" element={<Account />}>
          <Route index element={<Profile />} /> {/* This is the default route */}
          <Route path="profile" element={<Profile />} />
          <Route path="history/orders" element={<HistoryOrder />} />
          <Route path="wishList" element={<WishList />} />
          <Route path="security" element={<Password />} />
        </Route>


        <Route path="/" element={<Home />}></Route>
        <Route
          path="/:levelOne/:levelTwo/:levelThree"
          element={<ProductList />}
        ></Route>
        <Route path="/product/:id" element={<ProductOverview />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/account/order" element={<Order />}></Route>
        <Route
          path="/account/order/:orderId"
          element={<OrderDetails />}
        ></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;

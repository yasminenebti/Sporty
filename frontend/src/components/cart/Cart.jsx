import { Button, Divider } from "@mui/material";
import CartItem from "./CartItem";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/cart/Action";
import { useEffect } from "react";

const Cart = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.cart)
  const currentCart = cartState?.cart
  console.log(currentCart)
  const handleNavigateCheckout = () => {
   
    navigate("/checkout?step=1")
  }

  useEffect(()=>{
    dispatch(getCart(token))
  },[dispatch, token])
  
  return (
    <div className=" pt-28">
      <div className=" lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2 ">
          {currentCart?.cartItems.map((item , key) => <CartItem cartItem={item} key={key}/>)}
        </div>

        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="uppercase font-bold opacity-60 pb-4 border-grey">
            Products Details
          </div>
          <Divider />
          <div className="space-y-3 font-semibold">
            <div className="flex justify-between pt-3">
              <span>Price</span>
              <span>{Math.round(currentCart?.priceAfterDiscount)}</span>
            </div>
            <div className="flex justify-between pt-3">
              <span>Delivery charges</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between pt-3">
              <span>Total Amount</span>
              <span>{currentCart?.totalItems}</span>
            </div>

            <hr/>
            <Button
            onClick={handleNavigateCheckout}
            variant="contained"
            className="w-full mt-5"
            sx={{
                px: '2rem',
                py: '10px',
                bgcolor: '#D25959',
                '&:hover': {
                    bgcolor: '#D25959', 
                },
            }}
        >
            Checkout
        </Button>          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

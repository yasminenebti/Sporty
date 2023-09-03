import { Button, Divider } from "@mui/material"
import AddressCard from "./AddressCard"
import CartItem from "../cart/CartItem"

const OrderItems = () => {
  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border border-fog">
        <AddressCard/>
      </div>

      <div className="pt-2">
      <div className=" lg:grid grid-cols-3 relative">
        <div className="col-span-2 ">
          {[1,1,1,1,1].map((item , key) => <CartItem key={key}/>)}
        </div>

        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="uppercase font-bold opacity-60 pb-4 border-grey">
            Products Details
          </div>
          <Divider />
          <div className="space-y-3 font-semibold">
            <div className="flex justify-between pt-3">
              <span>Price</span>
              <span>$1234</span>
            </div>
            <div className="flex justify-between pt-3">
              <span>Delivery charges</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between pt-3">
              <span>Total Amount</span>
              <span>$1234</span>
            </div>

            <hr/>
            <Button
            
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
    </div>
  )
}

export default OrderItems
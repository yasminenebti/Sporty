import { Grid } from "@mui/material"
import AddressCard from "../checkout/AddressCard"
import OrderStepper from "./OrderStepper"

const OrderDetails = () => {
  return (
    <div className="px:5 lg:px-20 mt-24">
        <div>
        <h1 className="font-bold text-xl  py-7">Delivery Address</h1>
        <AddressCard/>
        </div>
        <div className="py-10">
            <OrderStepper activeStep={3}/>
        </div>
        <Grid className="space-y-5" container>
            {[1,1,1,1].map((item) => 
                <>
                <Grid item sx={{alignItems:"center" , justifyContent:"space-between"}} container className="shadow-xl rounded-md p-5 border-grey">
                <Grid item xs={6}>
                <div className="flex ">
                    <img 
                    className="w-[5rem] h-[5rem] object-cover object-top"
                    src="https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                    alt=""/>
                    <div className="ml-5">
                        <p>Product name</p>
                        <p className="opacity-50 text-xs font-semibold">Color : Black</p>
                    </div>
                </div>
                </Grid>
            </Grid></>
            )}
            
        </Grid>
    </div>
  )
}

export default OrderDetails
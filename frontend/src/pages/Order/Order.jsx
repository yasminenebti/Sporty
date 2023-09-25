import { Grid } from "@mui/material"
import OrderCard from "./OrderCard"

const orderStatus=[
    {label:"pending",value:"PENDING"},
    {label:"Delivered",value:"DELIVERED"},
    {label:"Canceled",value:"CANCELED"},
    {label:"Returned",value:"RETURNED"},

]
const Order = () => {
    
  return (
    <div className=" mt-24 px-5 lg:px-20">
        <Grid container sx={{justifyContent:"space-between"}}>
            <Grid item xs={2.5}>
                <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
                    <h1 className="font-bold text-lg">Filter</h1>
                    <div className="space-y-4 mt-10">
                        <h1 className="font-semibold">Order Status</h1>
                        {orderStatus.map((option)=>
                        <>
                        <div className="flex items-center">
                            <input defaultValue={option.value} type="checkbox" className="h-4 w-4 border-grey"/>
                           <label className="ml-3 text-sm" htmlFor={option.value}>
                                {option.label}
                           </label>
                        </div>
                        </>)}
                    </div>
                </div>
            </Grid>

            <Grid item xs={9}>
                {
                    [1,1,1,1].map((order)=>
                    <>
                        <OrderCard/>
                    </>)
                }
                                
            </Grid>

            
        </Grid>
    </div>
  )
}

export default Order
import { Grid } from "@mui/material"
import { useNavigate } from "react-router"

const OrderCard = () => {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/account/order/${5}`)} className="p-5 shadow-lg hover:shadow-xl cursor-pointer ">
        <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
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
            <Grid item xs={2}>
                 <p>100$</p>              
            </Grid>

            <Grid item xs={4}>
                <p>
                    <span>
                        Delivered on
                    </span>
                </p>              
            </Grid>
        </Grid>
    </div>
  )
}

export default OrderCard
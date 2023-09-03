import { Box, Button, Grid, TextField } from "@mui/material"
import { useState } from "react";
import AddressCard from "./AddressCard";
import "./Scrollbar.css"

const DeliveryAddress = () => {
    const [data, setData] = useState({firstName:"" , lastName : "" , street:"" , city:"" , state:"" , phone:"" , zipCode:"" });

    const handleSubmit=(e) => {
        console.log(data)
        e.preventDefault()
        console.log("data")
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }
  return (
    <div>
        <Grid container spacing={4}>
             <Grid className="border border-grey rounded-e-md h-[30.5rem] overflow-y-scroll">
                <div className="p-5 py-7 border-b border-fog cursor-pointer">
                    <AddressCard/>
                    <Button variant="contained" sx={{px: '2rem',mt: 2, mx:3,py: 1.5,bgcolor: '#084177','&:hover': {bgcolor: '#D25959', },}}>
                        Confirm Address
                    </Button> 
                </div>
            </Grid> 

            <Grid item xs={12} lg={7}>
                <Box className="border border-grey rounded-s-md shadow-md p-5">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={handleChange} value={data.firstName} required id="firstName" name="firstName" label="First Name" fullWidth autoComplete="given-name"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={handleChange} value={data.lastName} required id="lastName" name="lastName" label="Last Name" fullWidth autoComplete="given-name"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleChange} value={data.street} required id="street" name="street" label="Address" fullWidth autoComplete="given-name" multiline rows={3}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={handleChange} value={data.city} required id="city" name="city" label="City" fullWidth autoComplete="given-name"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={handleChange} value={data.state} required id="state" name="state" label="State/Province/Region" fullWidth autoComplete="given-name"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={handleChange} value={data.zipCode} required id="zipCode" name="zipCode" label="Zip/Postal Code" fullWidth autoComplete="shipping postal-code"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={handleChange} value={data.phone} required id="phone" name="phone" label="Phone" fullWidth autoComplete="shipping postal-code"/>
                            </Grid>
                            <Button type="submit" variant="contained" sx={{px: '2rem',mt: 2, mx:3, width: "100%" ,py: 1.5,bgcolor: '#084177','&:hover': {bgcolor: '#D25959', },}}>
                                Confirm Address
                            </Button>      
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Grid>
    </div>
  )
}

export default DeliveryAddress
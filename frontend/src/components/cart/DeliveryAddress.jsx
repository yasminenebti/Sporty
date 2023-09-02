import { Box, Grid, TextField } from "@mui/material"

const DeliveryAddress = () => {
  return (
    <div>
        <Grid container spacing={4}>
            {/* <Grid className="border border-grey rounded-e-md h-[30.5rem] overflow-y-scroll">
                <div className="p-5 py-7 border-b cursor-pointer">

                </div>
            </Grid> */}

            <Grid item xs={12} lg={7}>
                <Box className="border border-grey rounded-s-md shadow-md p-5">
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField required id="firstName"/>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Grid>
    </div>
  )
}

export default DeliveryAddress
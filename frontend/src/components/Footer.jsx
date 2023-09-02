import { Grid, Typography } from "@mui/material"

const Footer = () => {
  return (
    <div>
        <Grid container sx={{py:3 , color:"white",bgcolor:"black"}} className=" bg-brown text-center mt-10">
            <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" className="pb-5">Company</Typography>
                <Typography variant="h6" className="pb-5">About</Typography>

            </Grid>

            <Grid className="pt-20" item xs={12}>
                <Typography variant="body2" component="p" align="center">
                    2023 My Company. All rights reserved
                </Typography>
            </Grid>
        </Grid>
    </div>
  )
}

export default Footer
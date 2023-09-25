import { Avatar, Box, Grid, Rating } from "@mui/material"

const ReviewCard = () => {
  return (
    <div>
        <Grid container spacing={2} gap={3}>
            <Grid item xs={1}>
                <Box>
                    <Avatar className=" text-white" sx={{width:56 , height:56}}>R</Avatar>
                </Box>
            </Grid>

            <Grid item xs={9}>
                <div className="space-y-2">
                    <div>
                        <p className="font-semibold">Name</p>
                        <p className="opacity-80">April</p>
                    </div>
                </div>

                <Rating value={4.5} readOnly precision={.5} ></Rating>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ex at rerum harum assumenda doloribus ipsam dignissimos quas temporibus! Quo iste aliquid ipsum sit similique ipsa, ad optio repellendus corporis.</p>
            </Grid>
        </Grid>

    </div>
  )
}

export default ReviewCard
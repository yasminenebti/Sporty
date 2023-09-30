import { Avatar, Box, Grid } from "@mui/material"
import PropTypes from 'prop-types';


const ReviewCard = ({item}) => {
  return (
    <div>
        <Grid container spacing={2} gap={3}>
            <Grid item xs={1}>
                <Box>
                    <Avatar alt="Remy Sharp" src={item?.userImage} sx={{width:56 , height:56}} />

                </Box>
            </Grid>

            <Grid item xs={9}>
                <div className="space-y-2">
                    <div>
                        <p className="font-semibold">{item?.userFirstName + " " + item?.userLastName }</p>
                        <p className="opacity-80">{item?.createdAt}</p>
                    </div>
                </div>
                <p>{item?.review}</p>
            </Grid>
        </Grid>

    </div>
  )
}

ReviewCard.propTypes = {
    item: PropTypes.object.isRequired,  
  };
  

export default ReviewCard
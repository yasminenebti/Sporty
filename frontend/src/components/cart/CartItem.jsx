import { Button, IconButton } from "@mui/material"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PropTypes from 'prop-types';

const CartItem = ({cartItem}) => {
  return (
    <div className="p-5 shadow-lg border border-grey rounded-md">
        <div className="flex items-center">
            <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:[9rem]">
              <img 
                 className=" w-full h-full object-cover object-top" 
                 src={cartItem?.productImage || 'image'}/>
            </div>

            <div className="ml-5 space-y-1">

              <p className="font-semibold">{cartItem?.productName || 'name'}</p>
              <p className="opacity-70">{cartItem?.size || 'size'}</p>

             <div className="flex space-x-5 items-center text-lg lg:text-xl text-brown mt-10">
                <p className="font-semibold">${cartItem?.priceAfterDiscount || 'priceAfterDiscount'} </p>
                <p className=" line-through opacity-50">${cartItem?.price || 'price'} </p>
                <p className=" text-secondary font-semibold pl-10">{cartItem?.discount || 'discount'} %</p>
               </div>
            </div>
           
        </div>
        <div className="lg:flex items-center lg:space-x-10 pt-4">
                <div className="flex items-center space-x-2">
                  <IconButton>
                    <RemoveCircleOutlineIcon/>
                  </IconButton>

                  <span className="py-1 px-7 border border-grey  rounded-sm">3</span>
                    <IconButton>
                      <AddCircleOutlineIcon/>
                    </IconButton>
                  
                </div>

                <div>
                   <Button>Remove</Button>
                </div>
            </div>
    </div>
  )
}

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,  
};

export default CartItem
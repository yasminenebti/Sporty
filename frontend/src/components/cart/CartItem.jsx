import { Button, IconButton } from "@mui/material"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeItemFromCart, updateCartItem } from "../../redux/cart/Action";

const CartItem = ({item}) => {

  const dispatch = useDispatch()
  const updateCart = (num) => {
    const data = {data:{quantity:item.quantity+num} , id : item?.id}
    dispatch(updateCartItem(data))
  }

  const removeItemCart = () => {
    dispatch(removeItemFromCart(item?.id))
  }

  useEffect(() => {

  } , [])
  return (
    <div className="p-5 shadow-lg border border-grey rounded-md">
        <div className="flex items-center">
            <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:[9rem]">
              <img 
                 className=" w-full h-full object-cover  object-top" 
                 src={item?.productImage || 'image'}/>
            </div>

            <div className="ml-5 space-y-1">
              <p className="font-semibold">{item?.productName || 'name'}</p>
              <p className="opacity-70">{item?.size ? "Size :" + " " + item?.size : ""}</p>

             <div className="flex space-x-5 items-center text-lg lg:text-xl text-brown mt-10">
                <p className="font-semibold">${item?.priceAfterDiscount || 'priceAfterDiscount'} </p>
                <p className=" line-through opacity-50">${item?.price || 'price'} </p>
                <p className=" text-secondary font-semibold pl-10">{item?.discount || 'discount'} %</p>
               </div>
            </div>
           
        </div>
        <div className="lg:flex items-center lg:space-x-10 pt-4">
                <div className="flex items-center space-x-2">
                  <IconButton onClick={() => updateCart(-1)} disabled={item?.quantity <= 1}>
                    <RemoveCircleOutlineIcon/>
                  </IconButton>

                  <span  className="py-1 px-7 border border-grey  rounded-sm">{item?.quantity}</span>
                    <IconButton onClick={() => updateCart(1)}>
                      <AddCircleOutlineIcon/>
                    </IconButton>
                  
                </div>

                <div>
                   <Button onClick={removeItemCart}>Remove</Button>
                </div>
            </div>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,  
};

export default CartItem
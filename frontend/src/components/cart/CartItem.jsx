import { Button, IconButton } from "@mui/material"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CartItem = () => {
  return (
    <div className="p-5 shadow-lg border border-grey rounded-md">
        <div className="flex items-center">
            <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:[9rem]">
              <img 
                 className=" w-full h-full object-cover object-top" 
                 src="https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"/>
            </div>

            <div className="ml-5 space-y-1">

              <p className="font-semibold">Product Name</p>
              <p className="opacity-70">Size: L,White</p>
              <p className="opacity-70 mt-2">Product Name</p>

             <div className="flex space-x-5 items-center text-lg lg:text-xl text-grey mt-10">
                <p className="font-semibold">100$</p>
                <p className=" line-through opacity-50">100$</p>
                <p className=" text-secondary font-semibold">100$</p>
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

export default CartItem
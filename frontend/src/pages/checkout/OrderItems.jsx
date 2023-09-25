
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../../redux/order/Action";
import { useLocation } from "react-router";
import { currentUser } from "../../redux/auth/Action";
import { Avatar } from "@mui/material";
import { createPayment } from "../../redux/payment/Action";

const OrderItems = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const orderState = useSelector((state) => state.order);
  const authState = useSelector((state) => state.authState);
  
  const handlePayment = () => {
    dispatch(createPayment(orderId))
  }

  useEffect(() => {
    dispatch(getOrderById(orderId), currentUser());
  }, [dispatch, orderId]);
  return (
    <div>
      <div className="px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col ">
          <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
            Order #{orderState.order?.id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {orderState.order?.createdAt}
          </p>
        </div>

        <div className="flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            {/* order items summary here */}
            {orderState.orders.map((item) => 
            <>
            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full ">
                <div className="w-full md:w-40">
                  <img
                    className="w-full hidden md:block"
                    src={item?.productImage}
                    alt="dress"
                  />
                  
                </div>
                <div className="  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                      {item?.productName}
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                  
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300">Size: </span> {item?.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base xl:text-lg leading-6">
                    ${item?.priceAfterDiscount}{" "}
                      <span className="text-red-300 line-through"> ${item?.price}</span>
                    </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                    {item?.quantity}
                    </p>
                   
                  </div>
                </div>
              </div>
            </div>
            </>
            )}

            {/* Shipping And Summary here */}

            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              {/*Summary here */}
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-4 text-gray-600">${orderState.order?.totalPrice}</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                        STUDENT
                      </span>
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      -${orderState.order?.discount} 
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-4 text-gray-600">Free</p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                  ${orderState.order?.totalPriceDiscounted}
                  </p>
                </div>
              </div>

              {/* Shipping  here */}
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 font-semibold text-gray-800">
                        DPD Delivery
                        <br />
                        <span className="font-normal">
                          Delivery with 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800">
                    Free
                  </p>
                </div>
                <div className="w-full flex justify-center items-center">
                  <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                    View Carrier Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* customer here */}
          <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  {
                    authState?.reqUser?.picture ?
                    <img
                    src={authState?.reqUser?.picture}
                    alt="avatar"
                  /> :
                  <Avatar
                    className='cursor-pointer text-white'
                    >
                      {authState?.reqUser?.firstName[0].toUpperCase()}
                    </Avatar>

                  }
                  
                  <div className=" flex justify-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                    {authState?.reqUser?.firstName + " " +authState?.reqUser?.lastName}
                    </p>
                    {/* history nb orders */}
                    {/* <p className="text-sm leading-5 text-gray-600">
                      10 Previous Orders
                    </p> */}
                  </div>
                </div>

                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="cursor-pointer text-sm leading-5 text-gray-800">
                  {authState?.reqUser?.email}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                  <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {orderState.order?.addressShippingStreet}, {orderState.order?.addressShippingCity} {orderState.order?.addressShippingStreet} MA {orderState.order?.addressShippingZipCode}
                    </p>
                  </div>
                  
                  {/* <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Billing Address
                    </p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      180 North King Street, Northhampton MA 1060
                    </p>
                  </div> */}
                </div>
                <div onClick={handlePayment} className="flex w-full justify-center items-center md:justify-start md:items-start">
                  <button className=" bg-primary text-white hover:bg-secondary mt-6 md:mt-0 py-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-medium w-96 2xl:w-full text-base ">
                    Pay with Stripe
                  </button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* <div className="pt-2">
      <div className=" lg:grid grid-cols-3 relative">
       

        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="uppercase font-bold opacity-60 pb-4 border-grey">
            Products Details
          </div>
          <Divider />
          <div className="space-y-3 font-semibold">
            <div className="flex justify-between pt-3">
              <span>Price</span>
              <span>$1234</span>
            </div>
            <div className="flex justify-between pt-3">
              <span>Delivery charges</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between pt-3">
              <span>Total Amount</span>
              <span>$1234</span>
            </div>

            <hr/>
            <Button
            
            variant="contained"
            className="w-full mt-5"
            sx={{
                px: '2rem',
                py: '10px',
                bgcolor: '#D25959',
                '&:hover': {
                    bgcolor: '#D25959', 
                },
            }}
        >
            Checkout
        </Button>          </div>
        </div>
      </div>
      </div> */}
    </div>
  );
};

export default OrderItems;

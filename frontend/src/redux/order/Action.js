import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import { CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "./ActionType";


export const createOrder = (address,navigate) => async (dispatch) => {
    const token = localStorage.getItem("token")


    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/order`,address ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        const order = res.data;

        if(order.id){
            navigate({search:`step=2&order_id=${order.id}`})
        }
        console.log(order)

        

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: order });
        
    } catch (error) {
        dispatch({ type: CREATE_ORDER_ERROR, payload: error.message });

    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    const token = localStorage.getItem("token")


    dispatch({ type: GET_ORDER_REQUEST });
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/order/${orderId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });

        const order = res.data;

        dispatch({ type: GET_ORDER_SUCCESS, payload: order });
    } catch (error) {
        dispatch({ type: GET_ORDER_ERROR, payload: error.message });

    }
}
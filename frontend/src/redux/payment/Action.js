import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import { CREATE_PAYMENT_ERROR, CREATE_PAYMENT_REQUEST } from "./ActionType";



export const createPayment = (orderId) => async (dispatch) => {
    const token = localStorage.getItem("token")


    dispatch({ type: CREATE_PAYMENT_REQUEST });
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/payment/${orderId}` ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        const payment = res.data;

        if(payment.paymentURL){
            window.location.href= payment.paymentURL
        }
        console.log(payment)
        
    } catch (error) {
        dispatch({ type: CREATE_PAYMENT_ERROR, payload: error.message });

    }
}

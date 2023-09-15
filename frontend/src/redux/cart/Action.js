import axios from "axios";
import { ADD_ITEM_CART_ERROR, ADD_ITEM_CART_REQ, ADD_ITEM_CART_SUCCESS, GET_CART_ERROR, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_ITEM_CART_ERROR, REMOVE_ITEM_CART_REQUEST, REMOVE_ITEM_CART_SUCCESS, UPDATE_ITEM_CART_ERROR, UPDATE_ITEM_CART_REQUEST, UPDATE_ITEM_CART_SUCCESS } from "./ActionType";
import { BASE_URL } from "../../utils/baseUrl";




export const getCart = () => async (dispatch) => {
    const token = localStorage.getItem("token")


    dispatch({ type: GET_CART_REQUEST });
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/cart` ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });

        const currentCart = res.data;

        dispatch({ type: GET_CART_SUCCESS, payload: currentCart });
        //console.log("current cart",currentCart)
    } catch (error) {
        dispatch({ type: GET_CART_ERROR, payload: error.message });

    }
}

export const addItemToCart = (data) => async (dispatch) => {
    const token = localStorage.getItem("token")


    dispatch({ type: ADD_ITEM_CART_REQ });
    try {
        const res = await axios.put(`${BASE_URL}/api/v1/cart`, data ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });

        const cartItem = res.data;

        dispatch({ type: ADD_ITEM_CART_SUCCESS, payload: cartItem });
        console.log("add item to cart",cartItem)
    } catch (error) {
        dispatch({ type: ADD_ITEM_CART_ERROR, payload: error.message });

    }
}

export const removeItemFromCart = (id) => async (dispatch) => {
    const token = localStorage.getItem("token")
    dispatch({ type: REMOVE_ITEM_CART_REQUEST });
    
    try {
        const res = await axios.delete(`${BASE_URL}/api/v1/cart/${id}` ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });

        const cart = res.data;

        dispatch({ type: REMOVE_ITEM_CART_SUCCESS, payload: id });
        console.log(cart)
    } catch (error) {
        dispatch({ type: REMOVE_ITEM_CART_ERROR, payload: error.message });

    }
}

export const updateCartItem = (reqData) => async (dispatch) => {
    const token = localStorage.getItem("token")
    dispatch({ type: UPDATE_ITEM_CART_REQUEST });

    try {
        const res = await axios.put(`${BASE_URL}/api/v1/cart/${reqData.id}`, reqData.data ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        

        dispatch({ type: UPDATE_ITEM_CART_SUCCESS, payload: res.data });
        console.log("action update cart Item" , res.data)
    } catch (error) {
        dispatch({ type: UPDATE_ITEM_CART_ERROR, payload: error.message });

    }
}
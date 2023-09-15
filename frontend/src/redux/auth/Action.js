import { BASE_URL } from "../../utils/baseUrl"
import {  LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, REQ_USER, REQ_USER_ERROR, REQ_USER_SUCCESS, UPDATE_USER, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from "./ACtionType"
import axios from "axios";



export const register = (data) => async (dispatch) => {


    dispatch({ type: REGISTER_REQUEST });
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const user = res.data;

        dispatch({ type: REGISTER_SUCCESS, payload: user });
        console.log(user)
    } catch (error) {
        dispatch({ type: REGISTER_ERROR, payload: error.message });

    }
}

export const login = (data) => async (dispatch) => {

    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/auth/authenticate`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const user = response.data;

        if (user.token) {
            localStorage.setItem("token", user.token);
        }
        //console.log(user)

        dispatch({ type: LOGIN_SUCCESS, payload: user });
        console.log(user.token)
    } catch (error) {
        dispatch({ type: LOGIN_ERROR, payload: error.message });

    }
}


export const currentUser = () => async (dispatch) => {
    const token = localStorage.getItem("token") 

    dispatch({ type: REQ_USER });
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/auth/currentUser` , {
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        }
    });
      
      const currentUser = response.data;
      dispatch({type:REQ_USER_SUCCESS , payload:currentUser})
      //console.log(currentUser)
    
    } catch (error) {
      dispatch({ type: REQ_USER_ERROR, payload: error.message });
    }
  };



export const updateProfile =(id,userRequest,token) =>async(dispatch) => {
    dispatch({type:UPDATE_USER})

    try {
        const res = await axios.put(`${BASE_URL}/api/v1/auth/updateProfile/${id}` , userRequest ,{
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
        })
        const updatedUser = res.data;
        console.log("update user" , updatedUser)
        dispatch({type:UPDATE_USER_SUCCESS , payload:updatedUser})

    } catch (error) {
        dispatch({ type: UPDATE_USER_ERROR, payload: error.message });
    }

}

export const logoutAccount =() =>async(dispatch) => {
    localStorage.clear()
    dispatch({type:LOGOUT , payload:null})
}


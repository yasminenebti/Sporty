import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import { CREATE_RATING_ERROR, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, GET_RATING_SUCCESS, GET_RATING_ERROR, GET_RATING_REQUEST } from "./ActionType";


export const createRating = (addRating,productId) => async (dispatch) => {
    const token = localStorage.getItem("token")


    dispatch({ type: CREATE_RATING_REQUEST });
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/rating/${productId}`,addRating ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        const rating = res.data;
        console.log(rating)

    
        dispatch({ type: CREATE_RATING_SUCCESS, payload: rating });
        
    } catch (error) {
        dispatch({ type: CREATE_RATING_ERROR, payload: error.message });

    }
}

export const getRatingByProduct = (productId) => async (dispatch) => {
    const token = localStorage.getItem("token")


    dispatch({ type: GET_RATING_REQUEST });
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/rating/${productId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });

        const ratings = res.data;

        dispatch({ type: GET_RATING_SUCCESS, payload: ratings });
    } catch (error) {
        dispatch({ type: GET_RATING_ERROR, payload: error.message });

    }
}
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import { CREATE_REVIEW_ERROR, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, GET_REVIEW_SUCCESS, GET_REVIEW_ERROR, GET_REVIEW_REQUEST } from "./ActionType";


export const createReview = (addReview,productId) => async (dispatch) => {
    const token = localStorage.getItem("token")


    dispatch({ type: CREATE_REVIEW_REQUEST });
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/review/${productId}`,addReview ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        const review = res.data;
        console.log(review)

    
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: review });
        
    } catch (error) {
        dispatch({ type: CREATE_REVIEW_ERROR, payload: error.message });

    }
}

export const getReviewByProduct = (productId) => async (dispatch) => {
    const token = localStorage.getItem("token")


    dispatch({ type: GET_REVIEW_REQUEST });
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/review/${productId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });

        const reviews = res.data;

        dispatch({ type: GET_REVIEW_SUCCESS, payload: reviews });
    } catch (error) {
        dispatch({ type: GET_REVIEW_ERROR, payload: error.message });

    }
}
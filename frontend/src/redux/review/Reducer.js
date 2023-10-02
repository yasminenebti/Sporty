import { CREATE_REVIEW_ERROR, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, GET_REVIEW_ERROR, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS } from "./ActionType";

const initialState = {
    reviews: [],
    review: null,
    error : null,
    isLoading : null

};

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REVIEW_REQUEST:
        case GET_REVIEW_REQUEST:
            return { ...state, isLoading: true , error : null };
        case CREATE_REVIEW_SUCCESS:
            return { ...state, review: action.payload ,isLoading : false , error : null };
        case GET_REVIEW_SUCCESS:
            return { ...state, reviews: action.payload , isLoading : false , error : null };
        case CREATE_REVIEW_ERROR:
        case GET_REVIEW_ERROR:
            return { ...state, isLoading: false , error : action.payload };
        default:
            return state;
    }
};
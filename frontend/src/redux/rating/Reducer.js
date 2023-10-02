import { CREATE_RATING_ERROR, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, GET_RATING_ERROR, GET_RATING_REQUEST, GET_RATING_SUCCESS } from "./ActionType";

const initialState = {
    ratings: [],
    rating: null,
    error : null,
    isLoading : null

};

export const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RATING_REQUEST:
        case GET_RATING_REQUEST:
            return { ...state, isLoading: true , error : null };
        case CREATE_RATING_SUCCESS:
            return { ...state, rating: action.payload ,isLoading : false , error : null };
        case GET_RATING_SUCCESS:
            return { ...state, ratings: action.payload , isLoading : false , error : null };
        case CREATE_RATING_ERROR:
        case GET_RATING_ERROR:
            return { ...state, isLoading: false , error : action.payload };
        default:
            return state;
    }
};
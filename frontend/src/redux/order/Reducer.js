import { CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "./ActionType";

const initialState = {
    orders: [],
    order: null,
    error : null,
    isLoading : null

};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case GET_ORDER_REQUEST:
            return { ...state, isLoading: true , error : null };
        case GET_ORDER_SUCCESS:
            return { ...state, order: action.payload , orders:action.payload.orderItems ,isLoading : false , error : null };
        case CREATE_ORDER_SUCCESS:
            return { ...state, order: action.payload , isLoading : false , error : null };
        case CREATE_ORDER_ERROR:
        case GET_ORDER_ERROR:
            return { ...state, isLoading: false , error : action.payload };
        default:
            return state;
    }
};
import { ADD_ITEM_CART_ERROR, ADD_ITEM_CART_REQ, ADD_ITEM_CART_SUCCESS, GET_CART_ERROR, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_ITEM_CART_ERROR, REMOVE_ITEM_CART_REQUEST, REMOVE_ITEM_CART_SUCCESS, UPDATE_ITEM_CART_ERROR, UPDATE_ITEM_CART_REQUEST, UPDATE_ITEM_CART_SUCCESS } from "./ActionType";

const initialState = {
    cart: null,
    isLoading : null,
    error: null,
    cartItems : []

};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_CART_REQ:
        case REMOVE_ITEM_CART_REQUEST:
        case UPDATE_ITEM_CART_REQUEST:
        case GET_CART_REQUEST:
            return { ...state, isLoading: true , error : null };
        case ADD_ITEM_CART_SUCCESS:
            return { ...state, cartItems: [...state.cartItems , action.payload.cartItems] , isLoading : false , error : null };
        case GET_CART_SUCCESS:
            return { ...state, cart: action.payload, cartItems : action.payload.cartItems , isLoading : false , error : null };
        case REMOVE_ITEM_CART_SUCCESS:
            return { ...state, delete : action.payload , isLoading : false , error : null };
        case UPDATE_ITEM_CART_SUCCESS:
            return { ...state,  update : action.payload , isLoading : false , error : null };
        case GET_CART_ERROR:
        case UPDATE_ITEM_CART_ERROR:
        case REMOVE_ITEM_CART_ERROR:
        case ADD_ITEM_CART_ERROR:
            return { ...state, isLoading: false , error : action.payload };
        default:
            return state;
    }
};
import { FIND_PRODUCTS_ERROR, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_ERROR, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS } from "./ActionType";

const initialState = {
    products: [],
    product: null,
    error : null,
    isLoading : null

};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_REQUEST:
            return { ...state, isLoading: true , error : null };
        case FIND_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload , isLoading : false , error : null };
        case FIND_PRODUCT_SUCCESS:
            return { ...state, product: action.payload , isLoading : false , error : null };
        case FIND_PRODUCTS_ERROR:
        case FIND_PRODUCT_ERROR:
            return { ...state, isLoading: false , error : action.payload };
        default:
            return state;
    }
};
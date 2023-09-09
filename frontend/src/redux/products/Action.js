import { BASE_URL } from "../../utils/baseUrl"
import axios from "axios";
import { FIND_PRODUCTS_ERROR, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_ERROR, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS } from "./ActionType";

export const findProducts = (data) => async (dispatch) => {

    const {
        category,
        minPrice,
        maxPrice,
        discount,
        sort,
        stock,
        sizes,
        colors,
        page,
        pageSize
    } = data;
    

    dispatch({ type: FIND_PRODUCTS_REQUEST });
    try {
        const queryParams = new URLSearchParams({
            category,
        minPrice,
        maxPrice,
        discount,
        sort,
        stock,
        sizes,
        colors,
        page,
        pageSize
        });

        const apiUrl = `${BASE_URL}/api/v1/product/filter?${queryParams.toString()}`;
        const res = await axios.get(apiUrl, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const products = res.data;

        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: products });
        console.log(products)
    } catch (error) {
        dispatch({ type: FIND_PRODUCTS_ERROR, payload: error.message });

    }
}


export const findSingleProduct = (productId) => async (dispatch) => {

    dispatch({ type: FIND_PRODUCT_REQUEST });
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/product/${productId}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const product = res.data;

        dispatch({ type: FIND_PRODUCT_SUCCESS, payload: product });
        console.log(product)
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_ERROR, payload: error.message });

    }
}
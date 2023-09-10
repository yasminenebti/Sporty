import { applyMiddleware , combineReducers , legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/Reducer";
import { productReducer } from "./products/Reducer";
import { cartReducer } from "./cart/Reducer";
import { orderReducer } from "./order/Reducer";
import { categoryReducer } from "./category/Reducer";

const rootReducer = combineReducers({
    authState : authReducer,
    product : productReducer,
    cart : cartReducer,
    order : orderReducer,
    category : categoryReducer
    
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
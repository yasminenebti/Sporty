import { applyMiddleware , combineReducers , legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/Reducer";
import { productReducer } from "./products/Reducer";
import { cartReducer } from "./cart/Reducer";

const rootReducer = combineReducers({
    authState : authReducer,
    product : productReducer,
    cart : cartReducer
    
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
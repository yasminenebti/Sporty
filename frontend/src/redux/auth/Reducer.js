import {  LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, REQ_USER, REQ_USER_ERROR, REQ_USER_SUCCESS, UPDATE_USER, UPDATE_USER_SUCCESS } from "./ACtionType"

const initialState = {
    register: null,
    login: null,
    reqUser: null,
    updatedUser : null,
    error : null,
    isLoading : null

};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case REQ_USER:
        case UPDATE_USER:
            return { ...state, isLoading: true , error : false };
        case REGISTER_SUCCESS:
            return { ...state, register: action.payload , isLoading : false , error : false };
        case LOGIN_SUCCESS:
            return { ...state, login: action.payload , isLoading : false , error : false };
        case REQ_USER_SUCCESS:
            return { ...state, reqUser : action.payload , isLoading : false , error : false}
        case UPDATE_USER_SUCCESS:
            return { ...state, updatedUser : action.payload}
        case REGISTER_ERROR:
        case LOGIN_ERROR:
        case REQ_USER_ERROR:
            return { ...state, isLoading: false , error : action.payload };
        case LOGOUT:
            return { ...initialState}
        default:
            return state;
    }
};






import { LEVEL_ONE_CATEGORY_ERROR, LEVEL_ONE_CATEGORY_REQUEST, LEVEL_ONE_CATEGORY_SUCCESS, LEVEL_THREE_CATEGORY_ERROR, LEVEL_THREE_CATEGORY_REQUEST, LEVEL_THREE_CATEGORY_SUCCESS, LEVEL_TWO_CATEGORY_ERROR, LEVEL_TWO_CATEGORY_REQUEST, LEVEL_TWO_CATEGORY_SUCCESS } from "./ActionType";

const initialState = {
    categories: [],
    categoriesLevelOne: [],
    categoriesLevelTwo: [],
    categoriesLevelThree: [],
    category: null,
    error : null,
    isLoading : null

};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case LEVEL_ONE_CATEGORY_REQUEST:
        case LEVEL_TWO_CATEGORY_REQUEST:
        case LEVEL_THREE_CATEGORY_REQUEST:
            return { ...state, isLoading: true , error : null };
        case LEVEL_ONE_CATEGORY_SUCCESS:
            return { ...state, categoriesLevelOne: action.payload , isLoading : false , error : null };
        case LEVEL_TWO_CATEGORY_SUCCESS:
            return { ...state, categoriesLevelTwo: action.payload , isLoading : false , error : null };
        case LEVEL_THREE_CATEGORY_SUCCESS:
            return { ...state, categoriesLevelThree: action.payload , isLoading : false , error : null };
        case LEVEL_ONE_CATEGORY_ERROR:
        case LEVEL_TWO_CATEGORY_ERROR:
        case LEVEL_THREE_CATEGORY_ERROR:
            return { ...state, isLoading: false , error : action.payload };
        default:
            return state;
    }
};
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import { LEVEL_ONE_CATEGORY_REQUEST, LEVEL_THREE_CATEGORY_ERROR, LEVEL_THREE_CATEGORY_SUCCESS , LEVEL_ONE_CATEGORY_SUCCESS , LEVEL_ONE_CATEGORY_ERROR, LEVEL_TWO_CATEGORY_REQUEST, LEVEL_TWO_CATEGORY_ERROR, LEVEL_THREE_CATEGORY_REQUEST, LEVEL_TWO_CATEGORY_SUCCESS } from "./ActionType";

export const getLevelOneCategory = () => async (dispatch) => {
    dispatch({ type: LEVEL_ONE_CATEGORY_REQUEST})

    try {
        const res = await axios.get(`${BASE_URL}/api/v1/category/levelOne`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const categoriesLevelOne = res.data;

        dispatch({ type: LEVEL_ONE_CATEGORY_SUCCESS, payload: categoriesLevelOne });
        //console.log(categoriesLevelThree)
    } catch (error) {
        dispatch({ type: LEVEL_ONE_CATEGORY_ERROR, payload: error.message });

    }
}

export const getLevelTwoCategory = (categoryId) => async (dispatch) => {
    dispatch({ type: LEVEL_TWO_CATEGORY_REQUEST})

    try {
        const res = await axios.get(`${BASE_URL}/api/v1/category/levelTwo/${categoryId}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const categoriesLevelTwo = res.data;

        dispatch({ type: LEVEL_TWO_CATEGORY_SUCCESS, payload: categoriesLevelTwo });
    } catch (error) {
        dispatch({ type: LEVEL_TWO_CATEGORY_ERROR, payload: error.message });

    }
}

export const getLevelThreeCategory = (categoryId) => async (dispatch) => {
    dispatch({ type: LEVEL_THREE_CATEGORY_REQUEST});


    try {
        const res = await axios.get(`${BASE_URL}/api/v1/category/levelThree/${categoryId}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const categoriesLevelThree = res.data;

        dispatch({ type: LEVEL_THREE_CATEGORY_SUCCESS, payload: categoriesLevelThree });
        //console.log(categoriesLevelThree)
    } catch (error) {
        dispatch({ type: LEVEL_THREE_CATEGORY_ERROR, payload: error.message });

    }
}



// actions.js

// ... Import statements and action creators ...

export const getCategories = () => (dispatch) => {
    dispatch({ type: LEVEL_ONE_CATEGORY_REQUEST})
  
    axios
      .get(`${BASE_URL}/api/v1/category/levelOne`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: LEVEL_ONE_CATEGORY_SUCCESS, payload: res.data });
  
        if (res.data) {
          res.data.forEach((item) => {
            dispatch({ type: LEVEL_TWO_CATEGORY_REQUEST})
  
            axios
              .get(`${BASE_URL}/api/v1/category/levelTwo/${item.id}`, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                dispatch({ type: LEVEL_TWO_CATEGORY_SUCCESS, payload: res.data });
  
                if (res.data) {
                  res.data.forEach((subItem) => {
                    dispatch({ type: LEVEL_THREE_CATEGORY_REQUEST});
  
                    axios
                      .get(`${BASE_URL}/api/v1/category/levelThree/${subItem.id}`, {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                      .then((res) => {
                        dispatch({ type: LEVEL_THREE_CATEGORY_SUCCESS, payload: res.data });
                    })
                      .catch((error) => {
                        dispatch({ type: LEVEL_THREE_CATEGORY_ERROR, payload: error.message });
                    });
                  });
                }
              })
              .catch((error) => {
                dispatch({ type: LEVEL_TWO_CATEGORY_ERROR, payload: error.message });
            });
          });
        }
      })
      .catch((error) => {
        dispatch({ type: LEVEL_ONE_CATEGORY_ERROR, payload: error.message });
      });
  };
  
import { GET_CATEGORY_FAIL, GET_CATEGORY_SUCCESS } from "../constants";

const initialState = {
    categoryData: [],
};

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryData: [...action.payload],
            };
        case GET_CATEGORY_FAIL: {
            return state;
        }
        default:
            return state;
    }
}

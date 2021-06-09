import { GET_PRODUCT_HOME_FAIL, GET_PRODUCT_HOME_SUCCESS } from "../constants";

const initialState = {
    productHome: {},
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_HOME_SUCCESS:
            return {
                ...state,
                productHome: { ...action.payload },
            };
        case GET_PRODUCT_HOME_FAIL: {
            return state;
        }
        default:
            return state;
    }
}

import { GET_PRODUCT_DETAIL_FAIL, GET_PRODUCT_DETAIL_SUCCESS } from "../constants";

const initialState = {
    productDetail: {},
};

export default function productDetailReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                productDetail: { ...action.payload },
            };
        case GET_PRODUCT_DETAIL_FAIL: {
            return state;
        }
        default:
            return state;
    }
}

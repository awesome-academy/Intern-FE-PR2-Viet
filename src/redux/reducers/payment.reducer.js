import {
    CREATE_BILL_FAIL,
    CREATE_BILL_SUCCESS,
    UPDATE_SUCCESS_BILL_FAIL,
    UPDATE_SUCCESS_BILL_SUCCESS,
} from "../constants";

const initialState = {
    billData: {},
    billSuccessData: {},
};

export default function paymentReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_BILL_SUCCESS:
            return {
                ...state,
                billData: { ...action.payload },
            };
        case CREATE_BILL_FAIL: {
            return state;
        }
        case UPDATE_SUCCESS_BILL_SUCCESS:
            return {
                ...state,
                billSuccessData: { ...action.payload },
            };
        case UPDATE_SUCCESS_BILL_FAIL: {
            return state;
        }
        default:
            return state;
    }
}

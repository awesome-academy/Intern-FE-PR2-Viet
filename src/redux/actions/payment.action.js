import { CREATE_BILL, GET_BILL_TEMP, UPDATE_SUCCESS_BILL } from "../constants";

export function createBill(params) {
    return {
        type: CREATE_BILL,
        payload: params,
    };
}
export function getBillTemp(params) {
    return {
        type: GET_BILL_TEMP,
        payload: params,
    };
}
export function updateSuccessBill(params) {
    return {
        type: UPDATE_SUCCESS_BILL,
        payload: params,
    };
}

import { GET_PRODUCT_HOME } from "../constants";

export function getTotalProduct(params) {
    return {
        type: GET_PRODUCT_HOME,
        payload: params,
    };
}

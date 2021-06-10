import { GET_PRODUCT_HOME, GET_PRODUCTS } from "../constants";

export function getTotalProduct(params) {
    return {
        type: GET_PRODUCT_HOME,
        payload: params,
    };
}

export function getProducts(params) {
    return {
        type: GET_PRODUCTS,
        payload: params,
    };
}

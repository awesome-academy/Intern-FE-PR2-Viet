import { put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";

import { GET_PRODUCT_DETAIL, GET_PRODUCT_DETAIL_FAIL, GET_PRODUCT_DETAIL_SUCCESS } from "../constants";

const apiURL = process.env.REACT_APP_API_URL;

function* getProductDetailSaga(action) {
    const productId = action.payload
    try {
        const response = yield axios({
            method: "GET",
            url: `${apiURL}/productDetail?productId=${productId}`,
        });
        const responseNew = yield axios({
            method: "GET",
            url: `${apiURL}/products?news=true`,
        });
        const data = {
            product: response.data[0],
            relatedProduct: responseNew.data
        };
        console.log("function*getProductDetailSaga -> data", data)
        yield put({
            type: GET_PRODUCT_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_PRODUCT_DETAIL_FAIL,
            payload: error,
        });
    }
}

export default function* productDetailSaga() {
    yield takeEvery(GET_PRODUCT_DETAIL, getProductDetailSaga);
}

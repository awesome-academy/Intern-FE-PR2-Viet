import { put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";

import { GET_PRODUCT_HOME, GET_PRODUCT_HOME_FAIL, GET_PRODUCT_HOME_SUCCESS } from "../constants";

const apiURL = process.env.REACT_APP_API_URL;

function* getProductHomeSaga() {
    try {
        const responseNew = yield axios({
            method: "GET",
            url: `${apiURL}/products?new=true`,
        });
        const responseSale = yield axios({
            method: "GET",
            url: `${apiURL}/products?oldPrice_gte=1`,
        });
        const responseSpecial = yield axios({
            method: "GET",
            url: `${apiURL}/products?rate_gte=4`,
        });
        const data = {
            new: responseNew.data,
            sale: responseSale.data,
            special: responseSpecial.data,
        };
        console.log("file: product.saga.js > line 27 > function*getProductHomeSaga > data", data);

        yield put({
            type: GET_PRODUCT_HOME_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_PRODUCT_HOME_FAIL,
            payload: error,
        });
    }
}

export default function* productSaga() {
    yield takeEvery(GET_PRODUCT_HOME, getProductHomeSaga);
}

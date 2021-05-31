import { put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";

import {
    GET_PRODUCT_HOME,
    GET_PRODUCT_HOME_FAIL,
    GET_PRODUCT_HOME_SUCCESS,
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
} from "../constants";

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

function* getProductSaga(action) {
    try {
        const { page, limit } = action.payload;
        const response = yield axios({
            method: "GET",
            url: `${apiURL}/products`,
            params: {
                ...(page && { _page: page }),
                ...(limit && { _limit: limit }),
            },
        });
        const data = response.data;
        yield put({
            type: GET_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_PRODUCTS_FAIL,
            payload: error,
        });
    }
}

export default function* productSaga() {
    yield takeEvery(GET_PRODUCT_HOME, getProductHomeSaga);
    yield takeEvery(GET_PRODUCTS, getProductSaga);
}

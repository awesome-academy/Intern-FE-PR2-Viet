import { put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";

import { GET_CATEGORY, GET_CATEGORY_FAIL, GET_CATEGORY_SUCCESS } from "../constants";

const apiURL = process.env.REACT_APP_API_URL;

function* getCategorySaga() {
    try {
        const response = yield axios({
            method: "GET",
            url: `${apiURL}/Category`,
        });

        const data = response.data;

        yield put({
            type: GET_CATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_CATEGORY_FAIL,
            payload: error,
        });
    }
}

export default function* categorySaga() {
    yield takeEvery(GET_CATEGORY, getCategorySaga);
}

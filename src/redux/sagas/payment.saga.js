import { put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";
import history from "../../until/history";

import {
    CREATE_BILL,
    CREATE_BILL_FAIL,
    CREATE_BILL_SUCCESS,
    UPDATE_SUCCESS_BILL,
    UPDATE_SUCCESS_BILL_FAIL,
    UPDATE_SUCCESS_BILL_SUCCESS,
} from "../constants";

const apiURL = process.env.REACT_APP_API_URL;

function* createBill(action) {
    try {
        const { user, ...other } = action.payload;
        let response;
        const responseCheckUser = yield axios.get(`${apiURL}/payments?user=${user}&isPayment=false`);
        if (responseCheckUser.data.length) {
            response = yield axios.patch(`${apiURL}/payments/${responseCheckUser.data[0].id}`, {
                ...other,
            });
        } else {
            response = yield axios.post(`${apiURL}/payments`, { ...action.payload, isPayment: false });
        }
        const data = response.data;
        yield put({
            type: CREATE_BILL_SUCCESS,
            payload: data,
        });
        history.push("/shipping");
    } catch (error) {
        yield put({
            type: CREATE_BILL_FAIL,
            payload: error,
        });
    }
}

function* updateSuccessBillSaga(action) {
    try {
        const { email, ...other } = action.payload;
        const response = yield axios.patch(`${apiURL}/payment?user=${email}`, {
            isPayment: true,
            ...other,
        });

        const data = response.data;
        yield put({
            type: UPDATE_SUCCESS_BILL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: UPDATE_SUCCESS_BILL_FAIL,
            payload: error,
        });
    }
}

export default function* paymentSaga() {
    yield takeEvery(CREATE_BILL, createBill);
    yield takeEvery(UPDATE_SUCCESS_BILL, updateSuccessBillSaga);
}

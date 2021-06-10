import { fork } from "redux-saga/effects";
import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import accountSaga from "./account.saga";

export default function* mySaga() {
    yield fork(productSaga);
    yield fork(categorySaga);
    yield fork(accountSaga);
}

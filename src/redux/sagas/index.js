import { fork } from "redux-saga/effects";
import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import productDetailSaga from "./productDetail.saga";
import accountSaga from "./account.saga";
import cartSaga from "./cart.saga";
import paymentSaga from "./payment.saga";

export default function* mySaga() {
    yield fork(productSaga);
    yield fork(categorySaga);
    yield fork(accountSaga);
    yield fork(productDetailSaga);
    yield fork(cartSaga);
    yield fork(paymentSaga);
}

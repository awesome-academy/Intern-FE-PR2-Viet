import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import history from "../../until/history";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    CREATE_ACCOUNT,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAIL,
    GET_USER_ACCOUNT,
    GET_USER_ACCOUNT_SUCCESS,
    GET_USER_ACCOUNT_FAIL,
} from "../constants";
const apiURL = process.env.REACT_APP_API_URL;
function* createAccountSaga(action) {
    try {
        const { email, password, first, last } = action.payload;
        const resCheck = yield axios.get(`${apiURL}/userList?email=${email}`);
        const dataCheck = resCheck.data;
        if (dataCheck.length === 0) {
            const hashedPassword = yield bcrypt.hash(password, 12);
            const response = yield axios.post(`${apiURL}/userList`, {
                ...action.payload,
                password: hashedPassword,
                role: "user",
            });
            const data = response.data;
            const token = jwt.sign({ id: data.id }, "register", {
                expiresIn: "1h",
            });
            toast.success("🦄 Đăng ký thành công !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            localStorage.setItem(
                "profile",
                JSON.stringify({
                    email,
                    first,
                    last,
                    role: data.role,
                    token,
                })
            );
            history.push("/");
            yield put({
                type: CREATE_ACCOUNT_SUCCESS,
                payload: data,
            });
        } else {
            toast.error("🦄 Đăng ký thất bại!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            yield put({
                type: CREATE_ACCOUNT_FAIL,
                payload: [],
            });
        }
    } catch (error) {
        toast.error("🦄 Đăng ký thất bại!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        yield put({
            type: CREATE_ACCOUNT_FAIL,
            payload: error,
        });
    }
}
function* loginSaga(action) {
    try {
        const { email, password } = action.payload;
        const response = yield axios.get(`${apiURL}/userList?email=${email}`);
        const data = response.data;
        const isPasswordCorrect = yield bcrypt.compare(password, data[0].password);
        if (data.length > 0 && isPasswordCorrect) {
            const token = jwt.sign({ id: data[0].id }, "login", {
                expiresIn: "1h",
            });
            toast.success("🦄 Đăng nhập thành công !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            localStorage.setItem(
                "profile",
                JSON.stringify({
                    email,
                    first: data[0].first,
                    last: data[0].last,
                    role: data[0].role,
                    token,
                })
            );

            if (data[0].role === "user") {
                history.push("/");
            } else history.push("/admin");

            yield put({
                type: GET_USER_ACCOUNT_SUCCESS,
                payload: data,
            });
        } else {
            toast.error("🦄 Đăng nhập thất bại !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            yield put({
                type: GET_USER_ACCOUNT_FAIL,
            });
        }
    } catch (error) {
        toast.error("🦄 Đăng nhập thất bại !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        yield put({
            type: GET_USER_ACCOUNT_FAIL,
            payload: error,
        });
    }
}

export default function* accountSaga() {
    yield takeEvery(CREATE_ACCOUNT, createAccountSaga);
    yield takeEvery(GET_USER_ACCOUNT, loginSaga);
}

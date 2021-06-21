import { CREATE_ACCOUNT, GET_USER_ACCOUNT, EDIT_PROFILE, GET_INFO } from "../constants";

export function createAccount(params) {
    return {
        type: CREATE_ACCOUNT,
        payload: params,
    };
}
export function getUser(params) {
    return {
        type: GET_USER_ACCOUNT,
        payload: params,
    };
}
export function getInfo(params) {
    return {
        type: GET_INFO,
        payload: params,
    };
}
export function editProfile(params) {
    return {
        type: EDIT_PROFILE,
        payload: params,
    };
}

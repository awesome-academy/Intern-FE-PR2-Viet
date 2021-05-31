import { GET_CATEGORY } from "../constants";

export function getCategory(params) {
    return {
        type: GET_CATEGORY,
        payload: params,
    };
}

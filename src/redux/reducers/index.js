import { combineReducers } from "redux";
import accountReducer from "./account.reducer";
import productDetailReducer from "./productDetail.reducer";
import productReducer from "./product.reducer";
import categoryReducer from "./category.reducer";

export default combineReducers({
    productReducer,
    categoryReducer,
    accountReducer,
    productDetailReducer,
});

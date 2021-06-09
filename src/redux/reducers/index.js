import { combineReducers } from "redux";

import productReducer from "./product.reducer";
import categoryReducer from "./category.reducer";

export default combineReducers({
    productReducer,
    categoryReducer,
});

import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import myReducer from "./redux/reducers";
import mySaga from "./redux/sagas";
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const sagaMiddleware = createSagaMiddleware();
const myStore = createStore(myReducer, applyMiddleware(...[sagaMiddleware, logger]));
sagaMiddleware.run(mySaga);

ReactDOM.render(
    <React.StrictMode>
         <I18nextProvider i18n={i18n}>
        <Provider store={myStore}>
            <App />
        </Provider>
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

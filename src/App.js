import React from "react";

import { Router, Switch } from "react-router-dom";
import history from "./until/history";

import "antd/dist/antd.css";
import "./scss/styles.scss";

import DefaultLayout from "./layouts/DefaultLayout";

import Home from "./pages/User/Home";

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <Switch>
                    <DefaultLayout exact path="/" component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;

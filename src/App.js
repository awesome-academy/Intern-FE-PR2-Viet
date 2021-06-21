import React from "react";

import { Router, Switch } from "react-router-dom";
import history from "./until/history";

import "antd/dist/antd.css";
import "./scss/styles.scss";

import Home from "./pages/User/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import PaymentLayout from "./layouts/PaymentLayout";
import ProductDetail from "./pages/User/ProductDetail";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Products from "./pages/User/Products";
import Cart from "./pages/User/Cart";
import Information from "./pages/User/Payment/Information";
import Payment from "./pages/User/Payment/Payment";

import Profile from "./pages/User/Profile";
function App() {
    return (
        <div className="App">
            <Router history={history}>
                <Switch>
                    <DefaultLayout exact path="/" component={Home} />
                    <DefaultLayout exact path="/products" component={Products} />
                    <DefaultLayout exact path="/cart" component={Cart} />
                    <DefaultLayout exact path="/login" component={Login} />
                    <DefaultLayout exact path="/register" component={Register} />
                    <DefaultLayout exact path="/product/:id" component={ProductDetail} />
                    <DefaultLayout exact path="/profile" component={Profile} />
                    <PaymentLayout exact path="/infoPayment" component={Information} />
                    <PaymentLayout exact path="/payment" component={Payment} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;

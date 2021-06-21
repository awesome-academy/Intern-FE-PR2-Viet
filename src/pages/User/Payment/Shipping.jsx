import React from "react";
import { Steps, Col, Row } from "antd";
import PaymentBreadcrumb from "./component/PaymentBreadcrumb";
import "./styles.scss";
const Shipping = () => {
    return (
        <div className="payment-page">
            <div className="container payment__container">
                <section className="shipping">
                    <h1 className="information__title">vegina-store</h1>
                    <PaymentBreadcrumb />
                </section>
            </div>
        </div>
    );
};

export default Shipping;

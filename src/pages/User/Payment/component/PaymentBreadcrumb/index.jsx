import React from "react";
import { FiChevronRight } from "react-icons/fi";
import history from "../../../../../until/history";
import "./styles.scss";
const PaymentBreadcrumb = ({ title }) => {
    return (
        <div className="payment__breadcrumb">
            <span className=" payment__breadcrumb--active" onClick={() => history.push("/cart")}>
                Cart
            </span>
            <FiChevronRight />
            <span className="payment__breadcrumb--active" onClick={() => history.push("/infoPayment")}>
                Information
            </span>
            <FiChevronRight />
            <span
                className={` ${title === "Payment" ? "payment__breadcrumb--active" : ""}`}
                onClick={() => history.push("/payment")}
            >
                Payment
            </span>
        </div>
    );
};

export default PaymentBreadcrumb;

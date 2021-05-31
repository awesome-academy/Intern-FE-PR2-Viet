import React, { useEffect } from "react";
import PaymentBreadcrumb from "./component/PaymentBreadcrumb";
import { Radio } from "antd";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { getBillTemp } from "../../../redux/actions";
import "./styles.scss";
import history from "../../../until/history";
const Shipping = ({ getBillTemp, billTempData }) => {
    const { t } = useTranslation();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("profile"));
        getBillTemp({ user: user.email });
    }, []);
    return (
        <div className="payment-page">
            <div className="container payment__container">
                <section className="shipping">
                    <h1 className="information__title">vegina-store</h1>
                    <PaymentBreadcrumb />
                    <div className="shipping__container">
                        <div className="shipping__info shipping__content">
                            <div className=" shipping__content--item">
                                <div className="shipping__info--inner">
                                    <h4>{t("payments.shipping.Contact")}</h4>
                                    <p>{billTempData.email}</p>
                                </div>
                                <button className="button">{t("payments.shipping.Change")}</button>
                            </div>
                            <div className=" shipping__content--item">
                                <div className="shipping__info--inner">
                                    <h4>{t("payments.shipping.Ship to")}</h4>
                                    <p>{billTempData.address}</p>
                                </div>
                                <button className="button">{t("payments.shipping.Change")}</button>
                            </div>
                        </div>
                        <h3 className="shipping__title">{t("payments.shipping.Shipping method")}</h3>
                        <div className="shipping__method shipping__content  ">
                            <div className="shipping__content--item">
                                <Radio checked>{t("payments.shipping.Standard")}</Radio>
                                <p>20.000 VND</p>
                            </div>
                        </div>
                        <div className="shipping__btn">
                            <button
                                className="button  button-animation--1 button-round--lg "
                                onClick={() => history.push("/payment")}
                            >
                                <span> {t("payments.shipping.Continue to payment")}</span>
                            </button>
                            <button
                                className="button button-round button-transparent"
                                onClick={() => history.push("/infoPayment")}
                            >
                                <span> {t("payments.shipping.Return to information")}</span>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { billTempData } = state.paymentReducer;
    return { billTempData };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBillTemp: (params) => dispatch(getBillTemp(params)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Shipping);

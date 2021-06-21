import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Checkbox, Input, Row, Col, Select } from "antd";
import * as Yup from "yup";
import PaymentBreadcrumb from "./component/PaymentBreadcrumb";
import CustomField from "./component/CustomField";
import VietNam from "../../../assets/images/vietnam.svg";
import English from "../../../assets/images/english.svg";
import "./styles.scss";
import { getInfo } from "../../../redux/actions";

const Information = ({ getInfo, infoUser }) => {
    const { Option } = Select;
    const [valueSelect, setValueSelect] = useState("vi");
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("profile"));
        getInfo({ email: user.email });
    }, []);
    const handleSubmitForm = (values, valueSelect) => {
        const dataForm = { ...values, country: valueSelect };
    };
    const handleChangeCountry = (value) => {};
    return (
        <div className="payment-page">
            <div className="container payment__container">
                <section className="information">
                    <h1 className="information__title">vegina-store</h1>
                    <PaymentBreadcrumb />
                    <Formik
                        initialValues={{
                            email: infoUser?.email || "",
                            firstName: infoUser?.first || "",
                            lastName: infoUser?.last || "",
                            address: infoUser?.address || "",
                            zipCode: infoUser?.zipCode || "",
                            phone: infoUser?.phone || "",
                            check: true,
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .required("Vui lòng nhập trường này")
                                .max(50, "Tên không được vượt quá 50 kí tự")
                                .email("Email không hợp lệ"),
                            firstName: Yup.string()
                                .max(15, "Must be 15 characters or less")
                                .required("Vui lòng nhập trường này"),
                            lastName: Yup.string()
                                .max(20, "Must be 20 characters or less")
                                .required("Vui lòng nhập trường này"),
                            phone: Yup.string()
                                .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ")
                                .required("Vui lòng nhập trường này"),
                            address: Yup.string()
                                .required("Vui lòng nhập trường này")
                                .max(50, "Tên không được vượt quá 50 kí tự"),
                            zipCode: Yup.string().matches(/([0-9]{6})/, "ZIP code phải chứa 6 chữ số"),
                        })}
                        onSubmit={(values) => handleSubmitForm(values, valueSelect)}
                        enableReinitialize
                    >
                        <Form>
                            <Row gutter={[24, 16]}>
                                <Col xs={24}>
                                    <CustomField name="email" type="email" label="Email " />
                                </Col>
                                <Col xs={24}>
                                    <div className="form__control">
                                        <Field
                                            type="checkbox"
                                            name="check"
                                            render={({ field }) => (
                                                <Checkbox {...field}>
                                                    Keep me up to date on news and offers
                                                </Checkbox>
                                            )}
                                        />
                                    </div>
                                </Col>

                                <Col sm={12} xs={24}>
                                    <CustomField name="firstName" type="text" label="First name " />
                                </Col>

                                <Col sm={12} xs={24}>
                                    <CustomField name="lastName" type="text" label="Last name " />
                                </Col>
                                <Col sm={15} xs={24}>
                                    <CustomField name="address" type="text" label="Address " />
                                </Col>
                                <Col sm={9} xs={24}>
                                    <CustomField name="phone" type="text" label="Phone " />
                                </Col>
                                <Col sm={9} xs={24}>
                                    <div className="form__control">
                                        <label htmlFor="title">Country/region</label>
                                        <Field
                                            name="country"
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    defaultValue="vi"
                                                    style={{ width: "100%" }}
                                                    className="form__control--select"
                                                    onChange={(value) => setValueSelect(value)}
                                                >
                                                    <Option value="vi">
                                                        <img
                                                            src={VietNam}
                                                            className="header__language--img"
                                                        />
                                                        <span>Viet Nam</span>
                                                    </Option>
                                                    <Option value="en">
                                                        <img
                                                            src={English}
                                                            className="header__language--img"
                                                        />
                                                        <span>England</span>
                                                    </Option>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </Col>
                                <Col sm={15} xs={24}>
                                    <CustomField name="zipCode" type="text" label="ZIP code " />
                                </Col>
                                <Col>
                                    <button type="submit" className="button button-round--lg button-primary">
                                        Lưu
                                    </button>
                                    <button
                                        type="button"
                                        className="button button-round--lg button-transparent"
                                    >
                                        Quay lại giỏ hàng
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    </Formik>
                </section>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { infoUser } = state.accountReducer;
    return { infoUser };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getInfo: (params) => dispatch(getInfo(params)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Information);

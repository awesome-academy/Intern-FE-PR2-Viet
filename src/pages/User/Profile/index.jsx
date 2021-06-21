import React, { useState, useEffect, useCallback } from "react";
import { Col, Collapse, Row, Button, Input, Form as FormAnt, Table, Tag, Space } from "antd";
import { BsPencilSquare } from "react-icons/bs";
import bcrypt from "bcryptjs";
import { useTranslation } from "react-i18next";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { editProfile, getInfo } from "../../../redux/actions";
import * as Yup from "yup";

import history from "../../../until/history";
import "./style.scss";
const { Panel } = Collapse;

function Profile(prop) {
    const { editProfile, infoUser, getInfo, userDataEdited } = prop;
    const { t } = useTranslation();

    const [userEdited, setUserEdited] = useState({});
    console.log("Profile -> userEdited", userEdited);
    const [editable, setEditable] = useState(false);
    const [isShowChangePw, setIsShowChangePw] = useState(false);
    const [isPayment, setIsPayment] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("profile"));
        getInfo(user.email);
    }, [userDataEdited]);

    useEffect(() => {
        setUserEdited(infoUser);
    }, [infoUser, userDataEdited]);

    const handleSubmitInfo = (value) => {
        editProfile({
            ...value,
            id: infoUser.id,
            token: JSON.parse(localStorage.getItem("profile")).token,
        });
        setUserEdited(value);
        setEditable(!editable);
        toast.success("🦄 Successful change of information !", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleSubmitPassword = async (values) => {
        const isPasswordCorrect = await bcrypt.compare(values.passwordInner, infoUser.password);

        const hashedPassword = await bcrypt.hash(values.passwordNew, 12);
        if (isPasswordCorrect) {
            editProfile({
                id: infoUser.id,
                password: hashedPassword,
                token: JSON.parse(localStorage.getItem("profile")).token,
            });
            toast.success("🦄 Change password successfully !", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsShowChangePw(false);
        } else {
            toast.error("🦄 The password you entered is incorrect !", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const callback = () => {
        setIsShowChangePw(!isShowChangePw);
    };

    const arrProfile = [
        {
            id: 1,
            title: t("Profile.account.first"),
            content: `${userEdited?.first + userEdited?.last}`,
            type: "name",
            last: "last",
        },
        {
            id: 2,
            title: "Email",
            content: `${userEdited?.email}`,
            type: "email",
        },
        {
            id: 3,
            title: t("Profile.account.address"),
            content: `${userEdited?.address ? userEdited.address : "Empty"}`,
            type: "address",
        },
        {
            id: 4,
            title: t("Profile.account.phone"),
            content: `${userEdited?.phone ? userEdited.phone : "Empty"}`,
            type: "phone",
        },
    ];

    const dataSource = [
        {
            key: "1",
            name: (
                <>
                    <div className="name-order">
                        <p>Mike</p>
                        <img
                            src="https://cdn.shopify.com/s/files/1/0412/8151/9765/products/47_590X668_crop_center.jpg?v=1595939069"
                            alt=""
                        />
                    </div>
                </>
            ),
            count: 32,
            address: "10 Downing Street",
            date: "18-06-2021",
            price: "400.000",
        },
    ];

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Count",
            dataIndex: "count",
            key: "count",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
    ];
    return (
        <>
            <div className="profile__modal"></div>

            <section className="profile">
                <div className="container">
                    <h2>
                        {t("Profile.welcome")} {userEdited?.first + userEdited?.last}
                    </h2>
                    <div className="profile__content">
                        <Row>
                            <Col xs={24} md={12} sm={24} lg={12}>
                                <div className="profile__content--cart">
                                    <p>{t("Categories.My_Account.name")}</p>
                                    <ul>
                                        <li>
                                            <span>{t("Categories.My_Account.My Wishlist")} (0)</span>
                                        </li>
                                        <li>
                                            <span>{t("Categories.My_Account.My Cart")} (0)</span>
                                        </li>
                                        <li>
                                            <Collapse
                                                activeKey={[`${isShowChangePw === true ? 1 : ""}`]}
                                                ghost
                                                accordion
                                                bordered={false}
                                                destroyInactivePanel={true}
                                                onChange={callback}
                                            >
                                                <Panel
                                                    showArrow={false}
                                                    header={
                                                        <>
                                                            <span>
                                                                {t("Profile.edit")}
                                                                <span>
                                                                    <BsPencilSquare />
                                                                </span>
                                                            </span>
                                                        </>
                                                    }
                                                    key="1"
                                                >
                                                    <FormAnt
                                                        onFinish={handleSubmitPassword}
                                                        name="basic"
                                                        initialValues={{ remember: true }}
                                                    >
                                                        <div>{t("Profile.inner")}</div>

                                                        <FormAnt.Item
                                                            name="passwordInner"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: t("validate.password.required"),
                                                                },
                                                                {
                                                                    min: 8,
                                                                    message: t("validate.password.regex"),
                                                                },
                                                            ]}
                                                            hasFeedback
                                                        >
                                                            <Input.Password />
                                                        </FormAnt.Item>
                                                        <div>{t("Profile.new")}</div>

                                                        <FormAnt.Item
                                                            name="passwordNew"
                                                            dependencies={["passwordInner"]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: t("validate.password.required"),
                                                                },
                                                                {
                                                                    min: 8,
                                                                    message: t("validate.password.regex"),
                                                                },
                                                                ({ getFieldValue }) => ({
                                                                    validator(rule, value) {
                                                                        if (
                                                                            !value ||
                                                                            getFieldValue("passwordInner") ===
                                                                                value
                                                                        ) {
                                                                            return Promise.reject(
                                                                                t("Profile.confirm_pw")
                                                                            );
                                                                        }

                                                                        return Promise.resolve();
                                                                    },
                                                                }),
                                                            ]}
                                                            hasFeedback
                                                        >
                                                            <Input.Password />
                                                        </FormAnt.Item>

                                                        <div>{t("Profile.confirm")}</div>

                                                        <FormAnt.Item
                                                            name="passwordConfirm"
                                                            dependencies={["passwordNew"]}
                                                            hasFeedback
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: t("validate.password.required"),
                                                                },
                                                                ({ getFieldValue }) => ({
                                                                    validator(rule, value) {
                                                                        if (
                                                                            !value ||
                                                                            getFieldValue("passwordNew") ===
                                                                                value
                                                                        ) {
                                                                            return Promise.resolve();
                                                                        }

                                                                        return Promise.reject(
                                                                            t("Profile.confirm_pwNew")
                                                                        );
                                                                    },
                                                                }),
                                                            ]}
                                                        >
                                                            <Input.Password />
                                                        </FormAnt.Item>
                                                        <FormAnt.Item>
                                                            <Button htmlType="submit" type="primary">
                                                                <h6>{t("Profile.submit")}</h6>
                                                            </Button>
                                                        </FormAnt.Item>
                                                    </FormAnt>
                                                </Panel>
                                            </Collapse>
                                        </li>
                                        <li>
                                            <span>{t("Logout")}</span>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={24} md={12} sm={24} lg={12}>
                                <div className="profile__content--info">
                                    <p>{t("Profile.account.title")}</p>
                                    <div className="profile__content--info-detail">
                                        {userEdited && (
                                            <Formik
                                                initialValues={{
                                                    first: userEdited?.first,
                                                    last: userEdited?.last,
                                                    email: userEdited?.email,
                                                    address: userEdited?.address,
                                                    phone: userEdited?.phone,
                                                }}
                                                enableReinitialize
                                                validationSchema={Yup.object({
                                                    first: Yup.string()
                                                        .required("Nội dung công việc không được để trống")
                                                        .max(
                                                            50,
                                                            "Nội dung công việc không được quá 50 kí tự"
                                                        ),
                                                    last: Yup.string()
                                                        .required("Nội dung công việc không được để trống")
                                                        .max(
                                                            50,
                                                            "Nội dung công việc không được quá 50 kí tự"
                                                        ),
                                                    phone: Yup.string().matches(
                                                        /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                                                        "Invalid phone number !"
                                                    ),
                                                })}
                                                onSubmit={(value) => handleSubmitInfo(value)}
                                            >
                                                <Form>
                                                    {arrProfile.map((item, index) => {
                                                        return (
                                                            <>
                                                                <div
                                                                    key={`profile-${item.id} - ${index}`}
                                                                    className="info__detail-inner"
                                                                >
                                                                    <p>{item.title}:</p>
                                                                    <div>
                                                                        {editable === false ? (
                                                                            <p>{item.content}</p>
                                                                        ) : item.type === "name" ? (
                                                                            <>
                                                                                <Collapse
                                                                                    accordion
                                                                                    bordered={false}
                                                                                    destroyInactivePanel={
                                                                                        true
                                                                                    }
                                                                                >
                                                                                    <Panel
                                                                                        showArrow={false}
                                                                                        ghost
                                                                                        header={
                                                                                            <BsPencilSquare />
                                                                                        }
                                                                                        key="2"
                                                                                    >
                                                                                        <div className="profile-input">
                                                                                            <label htmlFor="first">
                                                                                                {t(
                                                                                                    "Profile.account.first"
                                                                                                )}
                                                                                            </label>
                                                                                            <Field
                                                                                                id="first"
                                                                                                type="text"
                                                                                                name="first"
                                                                                            />
                                                                                            <span className="error-message">
                                                                                                <ErrorMessage name="first" />
                                                                                            </span>
                                                                                        </div>
                                                                                        <div>
                                                                                            <label htmlFor="Last">
                                                                                                {t(
                                                                                                    "Profile.account.last"
                                                                                                )}
                                                                                            </label>
                                                                                            <Field
                                                                                                id="Last"
                                                                                                type="text"
                                                                                                name="last"
                                                                                            />
                                                                                            <span className="error-message">
                                                                                                <ErrorMessage name="last" />
                                                                                            </span>
                                                                                        </div>
                                                                                    </Panel>
                                                                                </Collapse>
                                                                            </>
                                                                        ) : item.type === "email" ? (
                                                                            <p>{item.content}</p>
                                                                        ) : item.type === "phone" ? (
                                                                            <>
                                                                                <Field
                                                                                    type="text"
                                                                                    name={item.type}
                                                                                />
                                                                                <span className="error-message">
                                                                                    <ErrorMessage name="phone" />
                                                                                </span>
                                                                            </>
                                                                        ) : (
                                                                            <Field
                                                                                type="text"
                                                                                name={item.type}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        );
                                                    })}
                                                    <div className="btn-profile">
                                                        <Button
                                                            htmlType={editable === true ? "reset" : ""}
                                                            onClick={() => {
                                                                setEditable(!editable);
                                                            }}
                                                            type="primary"
                                                        >
                                                            {editable === true
                                                                ? t("Profile.account.cancel")
                                                                : t("Profile.account.edit")}
                                                        </Button>
                                                        {editable === true && (
                                                            <Button htmlType="submit" type="primary">
                                                                {t("Profile.account.save")}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </Form>
                                            </Formik>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="profile__order">
                        <p className="profile__order--title">{t("orderHistory.title")}</p>
                        {isPayment === false ? (
                            <div class="cart__nonProduct ">
                                <div class="cart__nonProduct-img text-center">
                                    <img src="https://i.imgur.com/Drj57qu.png" alt="nonProduct" />
                                </div>
                                <div class="cart__nonProduct-btn ">
                                    <p>{t("orderHistory.content")}</p>
                                    <button
                                        class="button button-round--lg button-primary"
                                        type="button"
                                        onClick={() => history.push("/products")}
                                    >
                                        {t("cart.Continue Shopping")}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Table dataSource={dataSource} columns={columns} />;
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
const mapStateToProps = (state) => {
    const { editProfile, infoUser, userList, userDataEdited } = state.accountReducer;
    return {
        editProfile,
        infoUser,
        userDataEdited,
        userList,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        editProfile: (params) => dispatch(editProfile(params)),
        getInfo: (params) => dispatch(getInfo(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

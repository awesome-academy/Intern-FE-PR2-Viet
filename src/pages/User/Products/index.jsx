import React, { useState, useEffect } from "react";
import "./styles.scss";
import Sidebar from "./Sidebar";
import { Col, Pagination, Row, Select } from "antd";
import { CgLayoutGrid, CgLayoutGridSmall, CgLayoutList } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { getProducts } from "../../../redux/actions";
import ProductItem from "../../../components/ProductItem";

const arrSelect = [
    "Featured",
    "Best Selling",
    "Price, low to high",
    "Price, high to low",
    "Date, new to old",
];

const Products = ({ getProducts, productsData }) => {
    const { Option } = Select;
    const { t } = useTranslation();

    useEffect(() => {
        getProducts({ page: 1, limit: 12 });
    }, []);
    const [currentPage, setCurrentPage] = useState(1);

    const handelChangePage = () => {};
    return (
        <div className="products">
            <section className="breadcrumb">
                <div
                    className="breadcrumb__container"
                    style={{
                        backgroundImage:
                            "url('https://cdn.shopify.com/s/files/1/0412/8151/9765/files/breadcrumb.jpg?v=1593258636')",
                    }}
                >
                    <div className="breadcrumb__content">
                        <span>{t("Home")}</span>
                        <span className="breadcrumb__text">{t(`category.Dairy & Chesse`)}</span>
                    </div>
                </div>
            </section>
            <div className="container products__container">
                <Row>
                    <Col xl={6} lg={7} md={8} sm={24}>
                        <div className="container">
                            <Sidebar />
                        </div>
                    </Col>
                    <Col xl={18} lg={17} md={16} sm={24}>
                        <div className="container">
                            <section className="banner">
                                <div
                                    className="banner__container"
                                    style={{
                                        backgroundImage:
                                            "url('https://cdn.shopify.com/s/files/1/0412/8151/9765/files/slider18.jpg?v=1607590481')",
                                    }}
                                >
                                    <div className="banner__content">
                                        <div className="banner__title">{t(`category.Dairy & Chesse`)}</div>
                                        <div className="banner__desc text-clamp text-clamp--3">
                                            Praesent dapibus, neque id cursus ucibus, tortor neque egestas
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="topbar">
                                <div className="topbar__left">
                                    <CgLayoutList />
                                    <CgLayoutGrid />
                                    <CgLayoutGridSmall />
                                </div>
                                <div className="topbar__right">
                                    <span className="topbar__right--text">{t("products.sort by")}</span>
                                    <Select
                                        showSearch
                                        style={{ width: 160 }}
                                        placeholder={t(`products.placeholder`)}
                                        optionFilterProp="children"
                                    >
                                        {arrSelect.map((item, index) => (
                                            <Option value={index}>{t(`products.${item}`)}</Option>
                                        ))}
                                    </Select>
                                    ,
                                </div>
                            </section>
                            <section className="list">
                                <div className="list__content">
                                    <Row gutter={[16, 16]}>
                                        {productsData.map((item) => (
                                            <Col xl={6} lg={8} sm={12} xs={18}>
                                                <ProductItem data={item} />
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </section>
                            <section className="pagination">
                                <div className="pagination__result">
                                    {t("products.Showing")} 1-8 {t("products.of")} 22 {t("products.result")}
                                </div>
                                <Pagination
                                    current={currentPage}
                                    onChange={handelChangePage}
                                    total={30}
                                    defaultPageSize={10}
                                />
                            </section>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { productsData } = state.productReducer;
    return {
        productsData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: (params) => dispatch(getProducts(params)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);

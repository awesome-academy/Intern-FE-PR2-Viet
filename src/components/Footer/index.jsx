import React from "react";
import { Row, Col } from "antd";
import {
    FaTruck,
    FaRupeeSign,
    FaWhatsapp,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaPinterest,
} from "react-icons/fa";
import { FiRefreshCw, FiHeadphones, FiYoutube } from "react-icons/fi";
import { MdLocationOn, MdCall } from "react-icons/md";
import logo from "../../assets/images/logo.png";

import "./styles.scss";

const Footer = () => {
    const dataList = [
        {
            id: 1,
            title: "Top Categories",
            list: ["Fruits", "Fast Foods", "Vegetables", "Salads", "Bestseller"],
        },
        {
            id: 2,
            title: "Services",
            list: ["About Vegist", "Faq's", "Contact Us", "News", "Sitemap"],
        },
        {
            id: 3,
            title: "Privacy & Terms",
            list: [
                "Payment policy",
                "Privacy policy",
                "Return policy",
                " shipping policy",
                "Terms & Conditions",
            ],
        },
        {
            id: 4,
            title: "My Account",
            list: ["My Account", "My Cart", "Order History", "My Wishlist", "My Address"],
        },
    ];
    return (
        <>
            <footer className="footer">
                <section className="footer__top">
                    <div className="container">
                        <div className="footer__top--service">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                    <div className="footer__service--item">
                                        <div className="service__item--icon">
                                            <div>
                                                <FaTruck />
                                            </div>
                                        </div>
                                        <span className="service__item--title">Free delivery</span>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                    <div className="footer__service--item">
                                        <div className="service__item--icon">
                                            <div>
                                                <FaRupeeSign />
                                            </div>
                                        </div>
                                        <span className="service__item--title">Cash On Delivery</span>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                    <div className="footer__service--item">
                                        <div className="service__item--icon">
                                            <div>
                                                <FiRefreshCw />
                                            </div>
                                        </div>
                                        <span className="service__item--title">30 Days Returns</span>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                    <div className="footer__service--item">
                                        <div className="service__item--icon">
                                            <div>
                                                <FiHeadphones />
                                            </div>
                                        </div>
                                        <span className="service__item--title">Online Support</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </section>
                <section className="footer__mid">
                    <div className="container">
                        <div className="footer__mid--info">
                            <Row>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <div className="info__logo">
                                        <div>
                                            <img src={logo} alt="logo" />
                                        </div>
                                        <p>
                                            Lorem Ipsum, You Need To Be Amet Embarrassing Passage Of Lorem
                                            Ipsum, You Need To Be Amet Embarrassing
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <div className="info__address">
                                        <div className="info__icon">
                                            <MdLocationOn />
                                        </div>
                                        <div>
                                            <div className="info__title">Address</div>
                                            <p>7882 Longbranch Rd Reliance GIDC</p>
                                            <p>Wooster Parck Chowk Bazzar , New York</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <div className="info__contact">
                                        <div className="info__icon">
                                            <MdCall />
                                        </div>
                                        <div>
                                            <div className="info__title">Address</div>
                                            <p>+014-33333-8888-6868</p>
                                            <p>support@spacingtech.com</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="footer__mid--list">
                            <Row>
                                {dataList.map((item, index) => {
                                    return (
                                        <>
                                            <Col
                                                key={`footer__mid--list - ${item.id} - ${item.index}`}
                                                xs={24}
                                                sm={12}
                                                md={6}
                                                lg={6}
                                                xl={6}
                                            >
                                                <div className="list__title">{item.title}</div>
                                                <ul>
                                                    {item.list.map((item) => (
                                                        <>
                                                            <li>
                                                                <span>{item}</span>
                                                            </li>
                                                        </>
                                                    ))}
                                                </ul>
                                            </Col>
                                        </>
                                    );
                                })}
                            </Row>
                        </div>
                    </div>
                </section>
                <section className="footer__bot">
                    <div className="container">
                        <Row>
                            <Col className="footer__bot--copyRight" xs={24} sm={24} md={8} lg={8} xl={8}>
                                <div>Copyright &copy; 2021 spacingtech all rights reserved</div>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                <ul>
                                    <li>
                                        <FaWhatsapp />
                                    </li>
                                    <li>
                                        <FaFacebookF />
                                    </li>
                                    <li>
                                        <FaTwitter />
                                    </li>
                                    <li>
                                        <FaInstagram />
                                    </li>
                                    <li>
                                        <FaPinterest />
                                    </li>
                                    <li>
                                        <FiYoutube />
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                <div className="footer__bot--img">
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0412/8151/9765/files/footer-payment-icon_png.png?v=1593410736"
                                        alt=""
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </footer>
        </>
    );
};

export default Footer;

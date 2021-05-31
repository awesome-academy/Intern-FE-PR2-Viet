import React, { useState,useEffect } from "react";
import { Select, Drawer } from "antd";

import logo from "../../assets/images/logo.png";
import VietNam from "../../assets/images/vietnam.svg";
import English from "../../assets/images/english.svg";
import { useTranslation } from 'react-i18next';
import history from '../../until/history';

import { AiOutlineUserAdd, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

import "./styles.scss";

import Navbar from "./Navbar";

const { Option } = Select;

const Header = () => {
    
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n && i18n.language);
    const [selectData, setSelectData] = useState([]);
    const [selectValue, setSelectValue] = useState([]);
    const [showNavbar, setShowNavbar] = useState(false);

    const options = selectData.map((d) => <Option key={d.value}>{d.text}</Option>);

    const handleSearch = (value) => {
        if (value) {
            setSelectData(value);
        } else {
            setSelectData({ data: [] });
        }
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setCurrentLanguage(lang);
    }
    const handleChange = (value) => {
        setSelectValue(value);
    };
    return (
        <header className="header">
            <section className="header__top">
                <div className="container header__top--container">
                    <div className="header__language">
                        <span>{t("language.name")}: </span>
                        <Select
                        onChange={changeLanguage}
                        defaultValue="en"
                        >
                            <Option
                            value="en">
                                <img src={English} className="header__language--img" />
                                {t("language.english")}
                            </Option>
                            <Option value="vi">
                                <img src={VietNam} className="header__language--img" />
                                {t("language.vietnam")}
                            </Option>
                        </Select>
                    </div>
                    <div className="header__text">
    <span className="header__text--animation">{t("header_text.free")}</span>{t("header_text.order")}
                    </div>
                </div>
            </section>
            <section className="header__main">
                <div className="container header__main--container">
                    <div className="logo">
                        <img src={logo} alt="logo"></img>
                    </div>
                    <div className="header__search">
                        <div className="header__search--form">
                            <Select
                                showSearch
                                // value={selectValue}
                                placeholder="Search..."
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                // onSearch={handleSearch}
                                // onChange={handleChange}
                                notFoundContent={null}
                                className="header__search--input"
                            >
                                {options}
                            </Select>
                            <div className="icon icon-round">
                                {" "}
                                <BiSearch />
                            </div>
                        </div>
                    </div>
                    <div className="header__widget">
                        <div
                            className="header__widget--item icon-hamburger "
                            onClick={() => setShowNavbar(true)}
                        >
                            <GiHamburgerMenu />
                        </div>
                        <div className="header__widget--account">
                            <div className="header__widget--item">
                                <AiOutlineUserAdd />
                            </div>
                            <div className="header__widget--account-content">
                                <p className="header__widget--account-title">{t("Account")}</p>
                                <p>
    <span onClick={()=>history.push("/register")} className="header__widget--account-text">{t("Register")}</span>
    <span onClick={()=>history.push("/login")} className="header__widget--account-text">{t("Login")}</span>
                                </p>
                            </div>
                        </div>
                        <div className="header__widget--item">
                            <AiOutlineHeart />
                            <span className="header__widget--item-count">0</span>
                        </div>
                        <div className="header__widget--item">
                            <HiOutlineShoppingBag />
                            <span className="header__widget--item-count">4</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="header__navbar">
                <div className="container ">
                    <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
                </div>
            </section>
        </header>
    );
};

export default Header;

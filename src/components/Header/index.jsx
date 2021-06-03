import React, { useState } from "react";
import { Select, Drawer } from "antd";

import logo from "../../assets/images/logo.png";
import VietNam from "../../assets/images/vietnam.svg";
import English from "../../assets/images/english.svg";

import { AiOutlineUserAdd, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

import "./styles.scss";

import Navbar from "./Navbar";

const { Option } = Select;

const Header = () => {
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

    const handleChange = (value) => {
        setSelectValue(value);
    };
    return (
        <header className="header">
            <section className="header__top">
                <div className="container header__top--container">
                    <div className="header__language">
                        <span>Language: </span>
                        <Select defaultValue="VN">
                            <Option value="VN">
                                <img src={VietNam} className="header__language--img" />
                                Tiếng Việt
                            </Option>
                            <Option value="EN">
                                <img src={English} className="header__language--img" />
                                Tiếng Anh
                            </Option>
                        </Select>
                    </div>
                    <div className="header__text">
                        <span className="header__text--animation">Free Shipping</span> Orders From All item
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
                                <p className="header__widget--account-title">Account</p>
                                <p>
                                    <span className="header__widget--account-text">Register</span>
                                    <span className="header__widget--account-text">Login</span>
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

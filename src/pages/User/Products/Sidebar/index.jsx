import { Checkbox, Row, Col, Menu } from "antd";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import SubMenu from "antd/lib/menu/SubMenu";
import useWindowDimensions from "../../../../until/width";
import { RiCloseLine } from "react-icons/ri";

const Sidebar = () => {
    const { width } = useWindowDimensions();
    const [isFilter, setIsFilter] = useState(false);

    const renderFilterCategory = () => {
        return Category.map((item, index) => (
            <Checkbox
                value={item.id}
                className="sidebar__categories--item"
                key={`sidebar__categories-${item.id}`}
            >
                <div className="sidebar__categories--item-content">
                    <span>{item.name}</span>
                    <span>(22)</span>
                </div>
            </Checkbox>
        ));
    };

    const renderFilterPrice = () => {
        const arr = ["0-100", "100-200", "200-300"];
        return arr.map((item, index) => (
            <Checkbox value={index + 1} className="sidebar__price--item" key={`sidebar__price-${index}`}>
                {item}
            </Checkbox>
        ));
    };

    const renderFilterTag = () => {
        console.log("a");
        return tags.map((item) => (
            <span className="sidebar__tags--item" key={`sidebar__tags-${item.id}`}>
                {item.name}
            </span>
        ));
    };

    const arrFilter = ["sidebar", "sidebar"];
    return (
        <article className="sidebar">
            <div className="sidebar__container">
                {isFilter && (
                    <section className="sidebar__filter">
                        <div className="sidebar__filter--title">
                            <h2>Filter:</h2>
                            <button className="button">Clear All</button>
                        </div>
                        <div className="sidebar__filter--content">
                            {arrFilter?.map((item, index) => (
                                <span className="sidebar__filter--item" key={`sidebar__filter-${index}`}>
                                    {item}
                                    <RiCloseLine />
                                </span>
                            ))}
                        </div>
                    </section>
                )}
                <section className="sidebar__categories">
                    <Menu defaultOpenKeys={[`${width > 768 ? "sub1" : "sub2"}`]} mode="inline">
                        <SubMenu key="sub1" title={<h2 className="sidebar__title">Categories</h2>}>
                            <Menu.ItemGroup key="g1">
                                <div className="sidebar__categories--content">
                                    <Checkbox.Group>{renderFilterCategory()}</Checkbox.Group>
                                </div>
                            </Menu.ItemGroup>
                        </SubMenu>
                    </Menu>
                </section>
                <section className="sidebar__price">
                    <Menu defaultOpenKeys={[`${width > 768 ? "sub2" : ""}`]} mode="inline">
                        <SubMenu key="sub2" title={<h2 className="sidebar__title">Filter by Price</h2>}>
                            <Menu.ItemGroup key="g1">
                                <div className="sidebar__price--content">
                                    <Checkbox.Group>{renderFilterPrice()}</Checkbox.Group>
                                </div>
                            </Menu.ItemGroup>
                        </SubMenu>
                    </Menu>
                </section>
                <section className="sidebar__tags">
                    <Menu defaultOpenKeys={[`${width > 768 ? "sub3" : ""}`]} mode="inline">
                        <SubMenu key="sub3" title={<h2 className="sidebar__title">Filter by Tags</h2>}>
                            <Menu.ItemGroup key="g1">
                                <div className="sidebar__tags--content">{renderFilterTag()}</div>
                            </Menu.ItemGroup>
                        </SubMenu>
                    </Menu>
                </section>
                <section className="sidebar__banner">
                    <a href="#" className="sidebar__banner--img">
                        <img
                            src="https://cdn.shopify.com/s/files/1/0412/8151/9765/files/banner10-min.jpg?v=1593256899"
                            alt="sidebar__banner--img"
                        ></img>
                    </a>
                </section>
            </div>
        </article>
    );
};

export default Sidebar;

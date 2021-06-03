import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import "./styles.css";

function DefaultLayout({ component: Component, role, ...props }) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role === "admin") return <Redirect to="/admin" />;

    return (
        <Route
            {...props}
            render={(routerProps) => (
                <>
                    <Header {...routerProps} />
                    <div className="main">
                        <Component {...routerProps} />
                    </div>
                    <Footer />
                </>
            )}
        />
    );
}

export default DefaultLayout;

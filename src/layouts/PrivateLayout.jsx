import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PrivateLayout({ component: Component, role, ...props }) {
    const userInfo = JSON.parse(localStorage.getItem("profile"));
    if (userInfo && userInfo.email) {
        if (userInfo.role !== "admin") {
            return <Redirect to="/" />;
        }
    } else {
        return <Redirect to="/login" />;
    }

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

export default PrivateLayout;

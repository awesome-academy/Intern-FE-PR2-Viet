import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DefaultLayout({ component: Component, role, ...props }) {
    const location = useLocation();
    const [authData, setAuthData] = useState();
    useEffect(() => {
        setAuthData(() => JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <Route
            {...props}
            render={(routerProps) => (
                <>
                    <Header authData={authData} {...routerProps} />
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

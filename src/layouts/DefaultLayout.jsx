import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import decode from "jwt-decode";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DefaultLayout({ component: Component, role, ...props }) {
  const location = useLocation();
  const [infoUser, setInfoUser] = useState();
  const [isUser, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    const token = isUser;
    if (token) {
      const decodeToken = decode(token);
      setInfoUser(decodeToken);
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, isUser]);
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "admin") return <Redirect to="/admin" />;

  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <Header infoUser={infoUser} setUser={setUser} isUser={isUser} {...routerProps} />
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

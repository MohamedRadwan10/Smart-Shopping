import React, { useContext, useEffect } from "react";
import Style from "./Layout.module.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { Offline } from "react-detect-offline";
export default function Layout() {
  let { getLoggedUserCart } = useContext(cartContext);

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className={`${Style.mt}`}>
          <Outlet />
        </div>
      </div>
      <Offline>
        <div className="network text-center">
          <i className="fas fa-wifi fw-bold"></i>
         <h2 className=" fw-bold">you are offline</h2> 
        </div>
      </Offline>
      <Footer />
    </>
  );
}

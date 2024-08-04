import React from "react";
import Style from "./Footer.module.css";
import logo1 from "../../Assets/Images/download.png";
import logo2 from "../../Assets/Images/download (1).png";
import logo3 from "../../Assets/Images/download (3).png";
import logo4 from "../../Assets/Images/download (2).png";
import logo5 from "../../Assets/Images/download (4).png";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <footer className="bg-main-light py-5 ">
        <div className="container ">
          <h4 className=" fw-bolder">Get the Smart Shopping App</h4>
          <p>We will sent you a link, open it on your phone to download it</p>
          <form className="row py-3 border-bottom border-opacity-25 border-dark justify-content-between align-items-center">
            <div className="col-md-9 mb-2">
              <input
                className={` ${Style.inp} ${"w-100"}`}
                type="email"
                placeholder="Enter Your Email"
              />
            </div>
            <div className="col-md-3  text-end ">
              <button className={` ${" w-100  btn bg-main text-white"}`}>
                Share App Link
              </button>
            </div>
          </form>
          <div className="row py-3 border-bottom border-opacity-25 border-dark justify-content-between align-items-center">
            <div className=" col-md-6">
              <span className=" me-1 fw-semibold">
                Payment Partners
              </span>
              <img
                className={`${Style.logo} ${""} `}
                src={logo2}
                alt="amazon logo"
              />
              <img
                className={`${Style.logo} ${""}`}
                src={logo3}
                alt="mastercard logo"
              />
              <img
                className={`${Style.logo} ${""}`}
                src={logo1}
                alt="PayPal logo"
              />
            </div>
            <div className=" col-md-6 ">
              <span className=" h6 me-4 fw-bolder">
                Get Deliveries with Smart Shopping
              </span>
              <Link to="/" className="me-1">
                <img
                  className={`${"w-25"} `}
                  src={logo4}
                  alt="app store logo"
                />
              </Link>
              <Link to="/">
                <img
                  className={`${"w-25"} `}
                  src={logo5}
                  alt="googel play logo"
                />
              </Link>
            </div>
          </div>
          <div className="text-center p-3">© 2024 Copyright</div>
        </div>
      </footer>
    </>
  );
}

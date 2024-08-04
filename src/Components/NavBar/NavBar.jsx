import React, { useContext } from "react";
import Style from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/amazon-com-shopping-cart-online-shopping-computer-icons-shopping-cart-removebg-preview.png";
import { UserTokenContext } from "../../Context/UserTokenContext";
import { cartContext } from "../../Context/CartContext";

export default function NavBar() {
  let { UserToken, setUserToken,setUserData} = useContext(UserTokenContext);
  let { numsOfCartItems } = useContext(cartContext);
  let navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    localStorage.removeItem("userData");
    setUserData(null);
    navigate("/login");
  }

  return (
    <>
      <nav className=" fixed-top navbar navbar-expand-lg bg-main-light mb-5">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" width={50} draggable="false" />
            <span className=" fw-bolder">Smart Shopping</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse row "
            id="navbarSupportedContent"
          >
            {UserToken !== null ? (
              <>
                <ul className="navbar-nav ms-auto col-md-4 mb-2 mb-lg-0 ">
                  <li className={`${"nav-item position-relative"} ${Style.NAV}`}>
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className={`${"nav-item position-relative"} ${Style.NAV}`}>
                    <Link className="nav-link" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className={`${"nav-item position-relative"} ${Style.NAV}`}>
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li className={`${"nav-item position-relative"} ${Style.NAV}`}>
                    <Link className="nav-link" to="/brands">
                      Brands
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}
            <ul className={`${Style.wrapper} ${"row col-md-4"}`}>
              <li className={`${Style.icon} ${Style.facebook}`}>
                <span className={Style.tooltip}>Facebook</span>
                <svg
                  viewBox="0 0 320 512"
                  height="1.2em"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
              </li>
              <li className={`${Style.icon} ${Style.twitter}`}>
                <span className={Style.tooltip}>Twitter</span>
                <svg
                  height="1.8em"
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  className={Style.twitter}
                >
                  <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                </svg>
              </li>
              <li className={`${Style.icon} ${Style.instagram}`}>
                <span className={Style.tooltip}>Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.2em"
                  fill="currentColor"
                  className={`${Style.bi} ${Style.biinstagram}`}
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                </svg>
              </li>
              <li className={`${Style.icon} ${Style.tiktok}`}>
                <span className={Style.tooltip}>TikTok</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  height="1.2em"
                  viewBox="0 0 448 512"
                  className={`${Style.bi} ${Style.bitiktok}`}
                >
                  <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                </svg>
              </li>
              <li className={`${Style.icon} ${Style.youtube}`}>
                <span className={Style.tooltip}>Youtube</span>
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.2em"
                  viewBox="0 0 576 512"
                  className={`${Style.bi} ${Style.biyoutube}`}
                >
                  <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                </svg>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto  col-md-4 mb-2 mb-lg-0">
              {UserToken !== null ? (
                <>
                  <div className="row w-100 justify-content-start align-items-center">
                    <li className="nav-item col-md-3 mx-1">
                      <Link className="nav-link" to="/cart">
                        <i className=" fs-5 fa-solid fa-shopping-cart"></i>
                        <span className="badge bg-main">{numsOfCartItems}</span>
                      </Link>
                    </li>

                    <li className={`${"nav-link mx-3 col-md-3 "}  `}>
                      <Link className="nav-link" to="/profile">
                        <i
                          className={`${"fa-solid fa-user cursor-pointer"} ${
                            Style.Icon
                          }`}
                        ></i>
                      </Link>
                    </li>

                    <li className="nav-item col-md-3 mx-1 mt-1">
                      <button
                        onClick={() => Logout()}
                        className={`${Style.Btn}`}
                      >
                        <div className={Style.sign}>
                          <svg viewBox="0 0 512 512">
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                          </svg>
                        </div>

                        <div className={Style.text}>Logout</div>
                      </button>
                    </li>
                  </div>
                </>
              ) : (
                <>
                  <li className={`${"nav-item position-relative"} ${Style.NAV}`}>
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className={`${"nav-item position-relative"} ${Style.NAV}`}>
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

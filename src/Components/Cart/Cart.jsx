import React, { useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";
import logo from "../../Assets/Images/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.avif";
import { Helmet } from "react-helmet";
export default function Cart() {
  let {
    getLoggedUserCart,
    removeCartItem,
    UpdateCartItem,
    clearCartItem,
    setnumsOfCartItems,
    numsOfCartItems,
  } = useContext(cartContext);

  const [CartDetails, setCartDetails] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  async function clearCart() {
    let { data } = await clearCartItem();
    if (data?.message === "success") {
      localStorage.setItem("cartNum", numsOfCartItems);
      setCartDetails(null);
      setnumsOfCartItems(0);
      toast.success("cart is cleared successfully", {
        duration: 2000,
        position: "bottom-left",
        className: "text-white bg-success",
      });
    } else {
      toast.error("error in clearing the cart, try again", {
        duration: 2000,
        position: "bottom-left",
        className: "text-white bg-danger",
      });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  async function UpdateCart(id, count) {
    let { data } = await UpdateCartItem(id, count);
    if (data?.status === "success") {
      setCartDetails(data);
    }
    if (count <= 0) {
      removeCart(id);
    }
  }

  async function removeCart(id) {
    let { data } = await removeCartItem(id);
    if (data?.status === "success") {
      setCartDetails(data);
      setnumsOfCartItems(data.numOfCartItems);
    }
  }

  async function getCart() {
   
    let { data } = await getLoggedUserCart();
     setisLoading(false);
    if (data?.status === "success") {
      setCartDetails(data);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Cart Page" />
      </Helmet>
      {isLoading ? (
        <div className="text-center">
          <i className="fas fa-spin fa-3x fa-spinner text-main"></i>
        </div>
      ) : (
        <>
          {CartDetails === null ? (
            <div className="row justify-content-between align-items-center ">
              <h2 className="col-md-4 text-center fw-bolder">
                Shop Cart is empty
              </h2>
              <img
                src={logo}
                alt="cart empty"
                draggable="false"
                className="col-md-8 w-50 mx-auto"
              />
            </div>
          ) : (
            <div className="row bg-main-light row justify-content-between border-bottom pb-3 border-1 border-dark border-opacity-25 ">
              <h1 className="fw-bolder mb-4 ">Shopping Cart :</h1>
              <div className="col-md-6">
                <h4 className="h6">
                  Cart Items :{" "}
                  <b className="text-main">{CartDetails?.numOfCartItems}</b>
                </h4>
                <h4 className="h6">
                  Total Cart Price :{" "}
                  <b className="text-main">
                    {CartDetails?.data.totalCartPrice}
                  </b>
                </h4>
              </div>
              {CartDetails?.data.products.map((product) => (
                <div
                  key={product.product.id}
                  className="row  mt-5 border-bottom"
                >
                  <div className="col-md-2">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.name}
                      className="w-75"
                    />
                  </div>
                  <div className="col-10 mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="h6">
                          {product.product.title
                            .split(" ")
                            .slice(0, 3)
                            .join(" ")}
                        </h3>
                        <h6 className="w-100">
                          Price :
                          <b className="text-main"> {product.price}EGP</b>
                        </h6>
                      </div>
                      <div
                        className={` ${
                          Style.txt
                        }  ${"d-flex justify-content-between align-items-center"}`}
                      >
                        <button
                          onClick={() =>
                            UpdateCart(product.product.id, product.count + 1)
                          }
                          className="btn  bg-main   text-white   p-1 "
                        >
                          +
                        </button>

                        <span className="text-main mx-2">{product.count}</span>
                        <button
                          onClick={() =>
                            UpdateCart(product.product.id, product.count - 1)
                          }
                          className=" bg-main  text-white  p-1 btn"
                        >
                          -
                        </button>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => removeCart(product.product.id)}
                        className={`${Style.binbutton} ${"mb-2"}`}
                      >
                        <svg
                          className={Style.bintop}
                          viewBox="0 0 39 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line
                            y1="5"
                            x2="39"
                            y2="5"
                            stroke="white"
                            strokeWidth={4}
                          ></line>
                          <line
                            x1="12"
                            y1="1.5"
                            x2="26.0357"
                            y2="1.5"
                            strokeWidth={3}
                          ></line>
                        </svg>
                        <svg
                          className={Style.binbottom}
                          viewBox="0 0 33 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask id="path-1-inside-1_8_19" fill="white">
                            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                          </mask>
                          <path
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                            fill="white"
                            mask="url(#path-1-inside-1_8_19)"
                          ></path>
                          <path
                            d="M12 6L12 29"
                            stroke="white"
                            strokeWidth={4}
                          ></path>
                          <path
                            d="M21 6V29"
                            stroke="white"
                            strokeWidth={4}
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className=" mt-3 row justify-content-between align-items-center">
                {isLoading ? (
                  <button className="btn  my-3 bg-main" type="button">
                    <Circles
                      height="20"
                      width="20"
                      color="#fff"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </button>
                ) : (
                  <>
                    <Link to="/address" className="col-md-4 mt-2">
                      <button
                        type="submit"
                        className="btn w-75 text-white mx-auto  bg-main"
                      >
                        CashPayment
                      </button>
                    </Link>
                    <div className="col-md-4">
                      <button
                        onClick={() => clearCart()}
                        className={`${Style.Btn} ${"mt-2  w-75"} ${
                          Style.noselect
                        }`}
                      >
                        <span className={`${Style.text}`}>Clear</span>
                        <span className={Style.icon}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

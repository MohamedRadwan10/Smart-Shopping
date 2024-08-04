import React, { useContext } from "react";
import Style from "./ProductsDetails.module.css";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ProductsDetails() {
  let { addToCart, setnumsOfCartItems } = useContext(cartContext);

  let { data, isLoading } = useQuery(
    "productDetails",
    productDetails
  );
  let { id } = useParams();
  function productDetails() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
  };

  async function addProduct(productId) {
    let { data } = await addToCart(productId);

    if (data?.status === "success") {
      toast.success("Product Succsefully added", {
        duration: 5000,
        position: "bottom-left",
        className: "bg-success text-white",
      });
      setnumsOfCartItems(data?.numOfCartItems);
    } else {
      toast.error("Error adding");
    }
  }

  return (
    <>
      
      <Helmet>
        <title>Products Details</title>
        <meta name="description" content="Products Details Page" />
      </Helmet>
      <div className="row justify-content-center py-3">
        {isLoading ? (
          <div className="text-center">
            <i className="fas fa-spin fa-2x fa-spinner text-main"></i>
          </div>
        ) : (
          <>
            <div className="col-md-6">
              <Slider {...settings}>
                {data?.data.data.images.map((image, index) => (
                  <img
                    className="w-100"
                    key={index}
                    src={image}
                    draggable="false"
                  />
                ))}
              </Slider>
            </div>
            <div
              className={`
               ${"col-md-6 mt-5 card position-relative d-flex justify-content-center border-0 "}`}
            >
              <h3 className="text-main fw-bolder">
                {data?.data.data.title.split(" ").slice(0, 2).join(" ")}
              </h3>
              <p className="">
                {data?.data.data.description.split(" ").slice(0, 13).join(" ")}
              </p>
              <p className="text-muted">{data?.data.data.category.name}</p>
              <p className="text-main fw-bold">
                Available :
                <span className="text-muted"> {data?.data.data.quantity} </span>
              </p>
              <div className="d-flex mb-5 justify-content-between align-items-center">
                <span className="text-main fw-bold">
                  Price :{" "}
                  <b className="text-muted">{data?.data.data.price} EGP</b>
                </span>

                <div className="ms-auto text-warning">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <span className="mx-2 rating-color">
                    {data?.data.data.ratingsAverage}
                  </span>
                </div>
              </div>

              <button
                onClick={() => addProduct(data?.data.data.id)}
                className={`${Style.CartBtn} ${""}`}
              >
                <span className={Style.IconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    fill="#fff"
                    className={Style.cart}
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                  </svg>
                </span>
                <p className={Style.text}>Add to Cart</p>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

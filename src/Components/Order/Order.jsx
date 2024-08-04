import React, { useContext, useEffect, useState } from "react";
import { UserOrderContext } from "../../Context/UserOrderContext";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";

export default function Order() {
  let { getUserOrder } = useContext(UserOrderContext);
  const [lastOrder, setlastOrder] = useState([]);
  let [isLoading, setLoading] = useState(true);
  let { id } = jwtDecode(localStorage.getItem("userToken"));

  async function getOrders(id) {
    setLoading(true);
    let { data } = await getUserOrder(id);
    setlastOrder(data[data.length - 1]);
    setLoading(false);
  }

  useEffect(() => {
    getOrders(id);
  }, []);

  return (
    <>
      <Helmet>
        <title>Order Info</title>
        <meta name="description" content="Order Info Page" />
      </Helmet>
      <div className="row gx-3">
        {isLoading ? (
          <div className="text-center">
            <i className="fas fa-spin fa-3x fa-spinner text-main"></i>
          </div>
        ) : (
          <>
            <h2 className=" fw-bolder mb-2">Your Last Order</h2>
            <h4 className="text-main fw-bold">
              Total Price :{" "}
              <b className="text-dark">{lastOrder?.totalOrderPrice} EGP</b>
            </h4>
            {lastOrder?.cartItems?.map((order) => (
              <div className="col-md-4" key={order._id}>
                <div className="product overflow-hidden mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      {" "}
                      <img
                        src={order.product.imageCover}
                        alt={order.product.title}
                        className="w-100"
                        draggable="false"
                      ></img>
                    </div>
                    <div className=" col-md-9">
                      <div className="container">
                        {" "}
                        <h3 className="h6 fw-bolder text-dark mb-3  ">
                          {order.product.title.split(" ").slice(0, 2).join(" ")}
                        </h3>
                        <p className="text-main fw-bold mb-1">
                          Brand :{" "}
                          <b className="text-dark">
                            {order.product.brand.name}
                          </b>
                        </p>
                        <p className="text-main fw-bold mb-1">
                          Category :{" "}
                          <b className="text-dark">
                            {order.product.category.name}
                          </b>
                        </p>
                        <p className="text-main fw-bold mb-1">
                          Quantity : <b className="text-dark">{order.count}</b>
                        </p>
                        <div className="d-flex justify-content-between  ">
                          <span className="text-main mb-2 fw-bold">
                            Price :{" "}
                            <b className="text-dark">{order.price} EGP</b>
                          </span>
                          <div className="ms-auto ">
                            <i className="fa fa-star rating-color"></i>
                            <i className="fa fa-star rating-color"></i>
                            <i className="fa fa-star rating-color"></i>
                            <i className="fa fa-star rating-color"></i>
                            <i className="fa fa-star rating-color"></i>
                            <span className=" text-dark ">
                              {order.product.ratingsAverage}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="row justify-content-between ">
              <div className="col-md-6">
                <h3 className="text-main fw-bolder  mt-3 mb-3">
                  Shipping Address :
                </h3>
                <p className="text-main fw-bold mb-1">
                  Details :{" "}
                  <b className="text-dark">
                    {lastOrder?.shippingAddress?.details}
                  </b>
                </p>
                <p className="text-main fw-bold mb-1">
                  Phone :{" "}
                  <b className="text-dark">
                    {lastOrder?.shippingAddress?.phone}
                  </b>
                </p>
                <p className="text-main fw-bold mb-1">
                  City :{" "}
                  <b className="text-dark">
                    {lastOrder?.shippingAddress?.city}
                  </b>
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="text-main fw-bolder mt-3 mb-3">
                  paymentMethod :
                  <b className="text-dark"> {lastOrder?.paymentMethodType}</b>
                </h3>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

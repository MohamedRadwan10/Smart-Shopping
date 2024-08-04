import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { UserOrderContext } from "../../Context/UserOrderContext";
import * as yup from "yup";
import { Circles } from "react-loader-spinner";
import { Helmet } from "react-helmet";

let phoneRegex = /^(\+2){0,1}(01)[0125][0-9]{8}$/gm;

let validationSchema = yup.object({
  details: yup.string().required("Details is required"),
  phone: yup
    .string()
    .matches(phoneRegex, "phone is invalid")
    .required("phone is required"),
  city: yup.string().required("City is required"),
});

export default function UserOrder() {
  let { CartId, setnumsOfCartItems } = useContext(cartContext);
  let { cashPayment } = useContext(UserOrderContext);

  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  async function handelCashPayment(values) {
    setisLoading(true);
    const { data } = await cashPayment(CartId, values);

    setisLoading(false);
    if (data?.status === "success") {
      setnumsOfCartItems(0);
      navigate("/order");
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handelCashPayment,
  });

  return (
    <>
      <Helmet>
        <title>Address Info</title>
        <meta name="description" content="Address Info Page" />
      </Helmet>
      <div className="container">
        <h2 className=" fw-bolder text-main mb-4">Cash Payment</h2>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Details:</label>
          <input
            type="text"
            className="form-control"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            name="details"
          />
          {formik.errors.details && formik.touched.details ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.details}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="phone">phone:</label>
          <input
            type="tel"
            className="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="city">city:</label>
          <input
            type="text"
            className="form-control"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            name="city"
          />
          {formik.errors.city && formik.touched.city ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.city}
            </div>
          ) : (
            ""
          )}
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
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn text-white my-3 bg-main"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}
